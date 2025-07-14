import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import NoteList from './NoteList';
import { Outlet, useMatch, useNavigate, useParams } from 'react-router-dom';
import { AlignLeftOutlined, CloseOutlined, ExportOutlined, FileDoneOutlined, FileTextOutlined, FolderAddFilled, FolderFilled, FolderOpenFilled, InboxOutlined, MoreOutlined, ReloadOutlined, RestOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import api from '../../api';
import { Button, ConfigProvider, Drawer, Dropdown, Empty, Skeleton, Spin, theme as antdTheme } from 'antd';
import logo from '../../assets/MemoEthio_logo_4.png';
import { Folderitems, useUserMenuItems } from "./MenuPropsC"
import { fetchUserData } from '../../store/features/users/User';
// import AddNoteForm from './NewNoteForm';
import NotificationList from './NotificationList';
import { useMessage } from '../../components/useMessage';

interface FolderState {
  created_at: string;
  id: number;
  name: string;
  user: number;
}

const HomeLayout: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theam.theme);
  const user = useSelector((state: RootState) => state.user);
  const loggedIn = useSelector((state: RootState) => state.userinfo.loggedIn)
  const navigate = useNavigate();
  const showMessage = useMessage()
  const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
  const [loading, setLoading] = useState(true)
  const [localoading, setLocaloading] = useState(false)
  const [openForder, setOpenForder]: any = useState(undefined);
  const [folders, setFolders] = useState<FolderState[]>([])
  const [trashedNotes, setTrashedNotes] = useState([])
  const [foldersName, setFoldersName]: any = useState()
  const [newFoldersName, setNewFoldersName]: any = useState()
  const [newFoldersNameC, setNewFoldersNameC]: any = useState()
  const [inOutlet, setInOutlet] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const [renamid, setRenameid]: any = useState()
  const [newfoldercreate, setNewfoldercreate] = useState(false)
  const folderinput = useRef<HTMLInputElement>(null)
  const folderinputnew = useRef<HTMLInputElement>(null)
  const [notificationCount, setnotificationCount]: any = useState()
  const [notifications, setNotifications]: any = useState()
  const [folderNameError, setFolderNameError] = useState(false)
  const [Trashopen, setTrashopen] = useState(false)
  const [TrashedLoad, setTrashedLoad] = useState(false)
  const match = useMatch("/feed/mynote/:uuid");
  const [mobileSidebar, setMobileSidebar] = useState(false)
  const { foldername } = useParams()
  const useritems = useUserMenuItems();
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenforder = (name: string) => {
    if (folders) {
      folders.map((folder) => {
        if (folder.name === name) {
          setOpenForder(folder);
          navigate(`/feed/${folder.name}`)
        }
      })
    }
  };

  useEffect(() => {
    document.title = `Memo Ethiopia | my Notes`;

    let startX = 0;
    let isEdgeSwipe = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      const screenWidth = window.innerWidth;

      // Only allow swipe if started from left 40px or right 40px
      isEdgeSwipe = startX < 40 || startX > screenWidth - 40;
    };

    const handleTouchMove = (e: TouchEvent) => {

      const endX = e.touches[0].clientX;
      if (startX - endX > 150) {
        setMobileSidebar(false);
      }
      if (!isEdgeSwipe) return;
      e.preventDefault(); // prevent scrolling only when it's edge swipe
      if (startX - endX > 50) {
        setMobileSidebar(false);
      } else if (endX - startX > 50) {
        // swipe right from left edge
        setMobileSidebar(true);
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
  useEffect(() => {

    setInOutlet(match ? true : false)
  }, [match])
  // const handelnewNote = (values: any) => {
  //   setLocaloading(true)
  //   let uuid: string | undefined;
  //   api.post('api-v1/notes/', values)
  //     .then(res => {
  //       uuid = res.data.uuid
  //     })
  //     .finally(() => {
  //       api.get("api-v1/folders/")
  //         .then(res => {
  //           if (res.status === 200) {
  //             const data = res.data.results
  //             setFolders(data)
  //             const foldernow = data.find((folderq: any) => folderq.id === values?.folder);
  //             navigate(`/feed/${foldernow.name}/${uuid}`)
  //             setOpenForder(foldernow)
  //             setLocaloading(false)

  //           } else {
  //             console.error("get error to fauch a notes")
  //           }
  //         })
  //     })
  //     .catch((err: any) => {
  //       console.error(err);
  //       setLocaloading(false)
  //     })
  // }
  const getClassNames = (base: string) => {
    const border = DeveloperTest ? 'border border-red-700' : '';
    const themeStyle = theme === 'dark' ? ' bg-[#1C1C1C] text-white' : 'bg-[#F3F6FB] text-gray-600';
    return `${base} ${border} ${themeStyle}`;
  };
  useEffect(() => {
    if (!loggedIn) {
      window.location.href = "/"
    } else {
      api.get("api-v1/folders/")
        .then(res => {
          const data = res.data.results
          setFolders(data)
          if (foldername) {
            const newdata = data.filter((folder: any) => folder.name.toLowerCase().includes(foldername.toLowerCase()))
            setOpenForder(newdata[0]);
          }
          setLoading(false)
          dispatch(fetchUserData())
        })
    }
  }, [loading])
  const handelFolderDelete = (id: any) => {
    setLocaloading(true)
    api.delete(`api-v1/folders/${id}/`)
      .then((resp) => {
        if (resp.status === 200) {
          showMessage("success", `Successfuly deleted`)
        }
      }).finally(() => {
        api.get("api-v1/folders/")
          .then(res => {
            if (res.status === 200) {
              const data = res.data.results
              setFolders(data)
              setLocaloading(false)
            } else {
              console.error("get error to fauch a notes")
            }
          })
      })
      .catch((err) => console.error(err))
  }
  const handelCloseInput = (id: any) => {
    folderinput.current?.blur()
    setRenameid(0)

    if (foldersName !== newFoldersName) {
      setLocaloading(true)
      api.patch(`api-v1/folders/${id}/`, { name: newFoldersName })
        .then(() => {
          folderinput.current?.blur();
          setRenameid(0)
        }).finally(() => {
          api.get("api-v1/folders/")
            .then(res => {
              if (res.status === 200) {
                const data = res.data.results
                setFolders(data)
                setLocaloading(false)
                setRenameid(0)
                folderinput.current?.blur();
              } else {
                console.error("get error to fauch a notes")
              }
            })
        }).finally(() => setOpenForder(""))
        .catch((err) => {
          console.error(err)
          folderinput.current?.blur();
          setLocaloading(false)
        })
    } else {
      setRenameid(0)
    }
  }
  const handelFolderitem = (e: any, id: any, name: string): any => {
    // folder opeing key 1
    if (e.key == "1") {
      handleOpenforder(name)
    }
    // Renameing key 2
    if (e.key == "2") {
      setRenameid(id)
      setFoldersName(name)
      setNewFoldersName(name)
      return null
    }
    // Deleting key 4
    if (e.key == '4') {
      handelFolderDelete(id)
      setFoldersName(name)
      return null
    }
    return null
  }
  useEffect(() => {
    if (renamid !== null) {
      folderinput.current?.focus();
      folderinput.current?.select();
    }
  }, [renamid]);
  useEffect(() => {
    const folderNames = folders.map(folder => folder.name);
    if (folderNames.includes(newFoldersNameC)) {
      setFolderNameError(true)
    } else {
      setFolderNameError(false)
    }
  }, [newFoldersNameC])

  const handelnewfolderC = (name: string) => {
    setLocaloading(true)
    api.post('api-v1/folders/', { name: name })
      .then(() => {
        folderinputnew.current?.blur();
        setNewFoldersNameC("")
      }).finally(() => {
        api.get("api-v1/folders/")
          .then(res => {
            if (res.status === 200) {
              const data = res.data.results
              setFolders(data)
              setLocaloading(false)
              setNewfoldercreate(false)
              setNewFoldersNameC("")
              folderinputnew.current?.blur();
            } else {
              console.error("get error to fauch a notes")
            }
          })
      }).finally(() => setOpenForder(""))
      .catch((err) => {
        console.error(err)
        folderinputnew.current?.blur();
        setLocaloading(false)
      })
  }
  useEffect(() => {
    api.get('api-v1/notification/')
      .then(res => {
        const data = res.data.results
        setNotifications(data);
        setnotificationCount(data.length)
      })
  }, [])
  useEffect(() => {
    folderinputnew.current?.focus();
    folderinputnew.current?.select();
  }, [newfoldercreate]);

  const handelNotificationopen = () => {
    setnotificationCount(0)
    notifications.map((notifi: any) => {
      api.patch(`api-v1/notification/${notifi.id}/`,
        {
          message: notifi.message,
          is_read: true
        })
    })
  }
  const handelTrashopen = () => {
    setTrashedLoad(true)
    api.get('api-v1/notes/outtrash/')
      .then((res: any) => {
        setTrashedNotes(res.data.results)
        setTrashedLoad(false)
      })
      .catch((error: any) => console.log(error))
    setTrashopen(true)
  }
  const handelNoteTrashOut = (note: any, idx: number) => {
    const updatedNotes = trashedNotes.filter((_, index) => index !== idx);
    setTrashedNotes(updatedNotes);

    api.patch(`/api-v1/notes/outtrash/${note.uuid}/`,
      {
        content: note.content,
        title: note.title,
        is_trashed: false,
      })
      .then(() => {
        showMessage("success", `Note sueccesfuly Restore ${note.title}`)
        api.get("api-v1/folders/")
          .then(res => {
            if (res.status === 200) {
              const data = res.data.results
              setFolders(data)
            } else {
              showMessage("error", "something went wrong try again")
            }
          })
      })
  }
  const handelNoteTrashDel = (note: any, idx: number) => {
    const updatedNotes = trashedNotes.filter((_, index) => index !== idx);
    setTrashedNotes(updatedNotes);
    api.delete(`/api-v1/notes/outtrash/${note.uuid}/`)
      .then((res) => {
        if (res.status === 204) {
          showMessage("success", `Successfuly deleted ${note.title}`)
          api.get("api-v1/folders/")
            .then(res => {
              if (res.status === 200) {
                const data = res.data.results
                setFolders(data)
              } else {
                showMessage("error", "something went wrong try again")
              }
            })
        } else {
          showMessage("error", "something went wrong try again")
        }
      })
  }
  const handelTrashRestor = () => {
    setTrashedNotes([]);
    api.post('api-v1/notes/outtrash/?restore_all=true')
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Restore all notes")
          api.get("api-v1/folders/")
            .then(res => {
              if (res.status === 200) {
                const data = res.data.results
                setFolders(data)
              } else {
                showMessage("error", "something went wrong try again")
              }
            })
        } else {
          showMessage("error", 'Something went wrong try again')
        }
      })
  }
  const handelTrashClear = () => {
    setTrashedNotes([]);
    api.delete('api-v1/notes/outtrash/?all_delete=true')
      .then((res) => {
        if (res.status === 200) {
          showMessage("success", "Restore all notes")
        } else {
          showMessage("error", 'Something went wrong try again')
        }
      })

  }
  return (
    <>
      {loading ? (
        <div className={getClassNames('flex items-center justify-center h-screen transition-all duration-300 ease-in ')}>
          <div className="flex flex-col items-center justify-center p-6 rounded-xl  animate-fadeIn space-y-4">
            <img
              src={logo}
              alt="Loading..."
              className="h-72 w-72 animate-scaleUp"
            />
            <Spin
              size="large"
              style={{
                fontSize: '36px',
                color: theme === 'dark' ? '#ffffffcc' : '#000000cc',
              }}
            />
            <p className="text-sm text-gray-500 animate-pulse">
              Loading, please wait...
            </p>
          </div>
          <small className={getClassNames("fixed bottom-0")}>@2025 provide Memo Ethiopia</small>
        </div>
      ) : (
        <>
          <div className={`sticky  hidden  px-5 justify-between md:flex top-0 z-50 ${theme === "dark" ? "bg-[#1f1f1f]" : "bg-[#ffffff33]"} w-full`}
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className={getClassNames(`flex gap-2 ${theme === "dark" ? "bg-[#1f1f1f]" : "bg-[#ffffff33]"}`)}>
              <div className=" p-1 cursor-pointer">
                Blog
              </div>
              <div className=" p-1 cursor-pointer">
                Shop <ExportOutlined />
              </div>
              <div className="p-1 cursor-pointer">
                {notificationCount ? (
                  <>
                    <Dropdown
                      trigger={["click"]}
                      placement="bottomRight"
                      dropdownRender={() => <NotificationList notifications={notifications} theme={theme} />}>
                      <div className="relative inline-block" onClick={handelNotificationopen}>
                        <button className={"text-md cursor-pointer border border-transparent"} title='notfication' >
                          Notification
                        </button>
                        <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full" title={notificationCount}>
                          {notificationCount}
                        </span>
                      </div>
                    </Dropdown>
                  </>
                ) : (
                  <>
                    <Dropdown
                      trigger={["click"]}
                      placement="bottomRight"
                      dropdownRender={() => <NotificationList notifications={notifications} theme={theme} />}>
                      <button className='text-md cursor-pointer border border-transparent' title='notfication'>Notification</button>
                    </Dropdown>
                  </>
                )}
              </div>
              <div className=" p-1 cursor-pointer opacity-50 text-blue-400" title="GashaAI">
                GashaAI
                {/* <ThemeSelector /> */}
              </div>
              <div className=" p-1 opacity-35 cursor-pointer" title='Chat'>
                Chat
              </div>
              <div className=" p-1 cursor-pointer" title='Reload' onClick={() => {
                window.location.reload()
              }}>
                <ReloadOutlined />
              </div>
            </div>
            <div className="flex gap-2">
              <ConfigProvider theme={{
                algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                components: {
                  Dropdown: {
                    paddingBlock: 10,
                  }
                },
              }}>

                <Dropdown menu={{ items: useritems }} trigger={["click"]} placement="bottomLeft"
                  overlayStyle={{ width: 220, height: 220, borderRadius: 20 }}>
                  <div className={getClassNames("h-8 w-8 mt-2 rounded-full cursor-pointer  overflow-hidden flex items-center justify-center")}>
                    {user?.profile_picture ? (
                      <img
                        src={`https://memoethiopia.onrender.com${user.profile_picture}`}
                        alt="User Avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserOutlined className={" text-2xl "} />
                    )}
                  </div>
                </Dropdown>
              </ConfigProvider>
            </div>
          </div>

          <div className={getClassNames("md:flex  h-screen  w-full overflow-y-auto")}
            onContextMenu={(e) => e.preventDefault()}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {localoading && <Spin fullscreen={true} tip='just a sec.' />}
            {/* Sidebar */}
            <aside className={getClassNames(` ${mobileSidebar ? 'fixed z-50 ease-in' : 'hidden'}   py-4 px-4 mb-3 h-screen lg:flex  flex-col overflow-y-auto `)} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className={getClassNames(`${mobileSidebar ? 'flex justify-end items-end  right-5  top-2' : 'hidden'}`)}>
                <button className={getClassNames("text-xl")} onClick={() => setMobileSidebar(false)}><CloseOutlined /></button>
              </div>
              <div
                onClick={() => {
                  if (renamid !== 0) {
                    setRenameid(0)
                  }
                  setNewfoldercreate(false)
                  setNewFoldersNameC("")
                }}>
                <div className="flex  justify-between">
                  <h1 className="text-md font-bold mb-4">MemoEthiopia</h1>
                  <SearchOutlined />
                </div>

                {/* <AddNoteForm onClose={() => setIsModalOpen(false)} folders={folders} theme={theme} open={isModalOpen} user={user} onSumbit={handelnewNote} /> */}
                <button className={getClassNames(`px-4 py-2.5 cursor-pointer w-full rounded mt-2 mb-4 text-center ${theme === "dark" ? "bg-[#3D3939]" : "bg-[#ffff]"} `)}
                // onClick={() => setIsModalOpen(true)}
                >+ New Note</button>
              </div>
              <div className={getClassNames("flex-1 overflow-y-auto space-y-2 mb-3 overflow-x-auto w-auto ")}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div onClick={() => {
                  if (renamid !== 0) {
                    setRenameid(0)
                  }
                  setNewfoldercreate(false)
                  setNewFoldersNameC("")
                }}>
                  <h2 className={getClassNames("text-sm font-semibold text-gray-400")}>Recents</h2>
                  <button className={getClassNames("text-left px-2 py-1 rounded my-1")}><FileTextOutlined /> Reflection on the Month of June</button>
                  <button className={getClassNames("text-left px-2 py-1 rounded my-1")}><FileTextOutlined /> Reflection on the Month of June</button>
                </div>
                <div className="flex justify-between text-gray-400 ">
                  <h2 className="mt-4 text-sm font-semibold text-gray-400">Folders</h2>
                  <FolderAddFilled className='mt-4 cursor-pointer' onClick={() => {
                    setNewfoldercreate(true)
                    setNewFoldersNameC("")
                  }} />
                </div>
                <div className="space-y-1 text-sm overflow-y-auto mb-3 h-2/5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {loading ? (
                    Array.from({ length: 4 }).map((_, idx) => (
                      <Skeleton.Input key={idx} className={getClassNames(`cursor-pointer w-full border border-transparent m-1 ${theme === "dark" ? "bg-transparent " : ""}  text-md rounded   scale-100`)} />
                    ))
                  ) : (
                    <>
                      {newfoldercreate && <div className={getClassNames(`flex justify-between cursor-pointer border border-transparent  text-md rounded px-4 py-3 `)} >
                        <p>
                          <FolderFilled className='pr-2' />
                          <input
                            value={newFoldersNameC}
                            ref={folderinputnew}
                            onChange={(e) => {
                              setNewFoldersNameC(e.target.value)
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && folderNameError === false && newFoldersNameC) {
                                handelnewfolderC(newFoldersNameC)
                              }
                              if (e.key === 'Escape') {
                                setFolderNameError(false)
                                setNewFoldersNameC("")
                                setNewfoldercreate(false)
                              }
                            }}
                            className={getClassNames(`outline-none w-3/4 p-1 transition-all delay-150 ease-in ${theme == "dark" ? "bg-black/30" : "bg-white"} focus:ring-0 border  ${folderNameError ? "border-red-700" : "border-transparent"}`)} />
                          <br />
                          {
                            folderNameError && <small className={`text-center ms-5 transition-all delay-300 ease-in ${theme === 'dark' ? "text-red-500" : "text-red-800"} `}>Folder name already taken.</small>
                          }
                        </p>
                      </div>}
                      {folders.map((folder) => (
                        <>
                          <ConfigProvider theme={{
                            algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                            components: {
                              Dropdown: {
                                paddingBlock: 10,
                              }
                            },
                          }}>

                            <Dropdown menu={Folderitems ? { items: Folderitems, onClick: Folderitems ? (e) => handelFolderitem(e, folder.id, folder.name) : undefined } : undefined} placement="bottom" trigger={["contextMenu"]} >
                              <div className={getClassNames(`flex justify-between cursor-pointer border border-transparent  text-md rounded px-4 py-3  ${openForder === folder
                                ? `${theme === "dark" ? "bg-gray-800 border-gray-800" : "bg-[#edf0f5] "} scale-105`
                                : ""
                                }`)}>

                                {renamid == folder.id ? (
                                  <p key={folder.id}>
                                    <FolderFilled className='pr-2' />
                                    <input
                                      value={newFoldersName}
                                      onChange={(e) => {
                                        setNewFoldersName(e.target.value)
                                      }}
                                      ref={folderinput}
                                      className={getClassNames(`outline-none p-1 w-3/4 ${theme == "dark" ? "bg-black/30" : "bg-white"} focus:ring-0 focus:border-none`)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          handelCloseInput(folder.id)
                                        }
                                        if (e.key === 'Escape') {
                                          setRenameid(0)
                                        }
                                      }}
                                    />
                                  </p>
                                ) : (
                                  <p
                                    key={folder.id}
                                    onClick={() => {
                                      setMobileSidebar(false)
                                      setNewfoldercreate(false)
                                      setNewFoldersNameC("")
                                      handleOpenforder(folder.name)
                                      if (renamid !== 0) {
                                        setRenameid(0)
                                      }
                                    }}
                                    className={getClassNames("bg-transparent")}
                                    onTouchStart={() => {
                                      handleOpenforder(folder.name)
                                      setTimeout(() => {
                                        setMobileSidebar(false)
                                      }, 3000);
                                      setNewfoldercreate(false)
                                      setNewFoldersNameC("")
                                    }}
                                  >
                                    {openForder === folder ?
                                      <FolderOpenFilled className='pr-2' />
                                      :
                                      <FolderFilled className='pr-2' />}
                                    {folder.name}
                                  </p>
                                )}

                                <Dropdown menu={Folderitems ? { items: Folderitems, onClick: Folderitems ? (e) => handelFolderitem(e, folder.id, folder.name) : undefined } : undefined} placement="bottomRight" trigger={["click"]}>
                                  <MoreOutlined className={getClassNames('cursor-pointer bg-transparent')} onClick={() => {
                                    if (renamid !== 0) {
                                      setRenameid(0)
                                      setNewfoldercreate(false)
                                      setNewFoldersNameC("")
                                    }
                                  }} />
                                </Dropdown>
                              </div>
                            </Dropdown>
                          </ConfigProvider>
                        </>
                      ))}
                    </>
                  )}
                </div>
                <div className="flex justify-between text-gray-400 m-3 cursor-pointer"
                  onClick={() => {
                    if (renamid !== 0) {
                      setRenameid(0)
                    }
                  }}>
                  <h2 className={getClassNames("mt-4 text-sm font-semibold  text-gray-400")}>More</h2>
                </div>
                <div className={getClassNames("space-y-1 text-md overflow-hidden mb-3 p-4 ")}
                  onClick={() => {
                    setNewfoldercreate(false)
                    setNewFoldersNameC("")
                    if (renamid !== 0) {
                      setRenameid(0)
                    }
                  }}>
                  <div className="text-md mb-2 cursor-pointer flex gap-1.5">
                    <InboxOutlined /> Archived
                  </div>
                  <ConfigProvider
                    theme={{
                      algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                      token: {
                        colorPrimary: '#f8f9fa',
                        fontSize: 12,
                      },
                    }}
                  >
                    <Drawer
                      title="Trased notes"
                      placement="left"
                      width={420}
                      onClose={() => setTrashopen(false)}
                      open={Trashopen}
                      closable={true}
                      bodyStyle={{ padding: "1rem", overflowY: "auto" }}
                    >
                      <div className={`flex justify-end items-end text-sm my-1  `}>
                        <Button type='text' className={`${TrashedLoad || trashedNotes.length === 0 ? "cursor-not-allowed opacity-30" : " opacity-100"}`}
                          onClick={() => handelTrashRestor()}>
                          <FileDoneOutlined /> Restor all item</Button>
                        <Button danger={true} type='text' className={` ${TrashedLoad || trashedNotes.length === 0 ? "cursor-not-allowed opacity-30" : "cursor-pointer opacity-100"}`}
                          onClick={() => handelTrashClear()}
                        ><RestOutlined /> Clear All</Button>
                      </div>
                      {
                        TrashedLoad ?
                          // <Skeleton.Node  />
                          <ul className="space-y-2 px-1">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <li
                                key={idx}
                                className={` ${theme === "dark" ? "bg-[#2e2c2c]" : "bg-[#f3f1f1]"} p-4 rounded-lg animate-pulse  flex flex-col gap-2`}
                              >
                                <div className={`h-4 w-2/3 rounded-md`} />
                                <div className={`h-4 w-2/3 rounded-md`} />
                                <div className={`h-4 w-2/3 rounded-md`} />
                              </li>
                            ))}
                          </ul>
                          :
                          trashedNotes.length ?
                            (
                              <ul className="space-y-3 px-1 w-auto">
                                {trashedNotes.map((note: any, idx: number) => (
                                  <Dropdown
                                    menu={{
                                      items: [
                                        {
                                          key: '1',
                                          className: "p-2 ",
                                          label: "Restor",
                                          onClick: () => {
                                            handelNoteTrashOut(note, idx)
                                          },
                                          icon: <ReloadOutlined />,
                                        },
                                        {
                                          key: '2',
                                          className: "p-2 ",
                                          label: "Delete",
                                          danger: true,
                                          onClick: () => {
                                            handelNoteTrashDel(note, idx)
                                          },
                                          icon: <RestOutlined />,
                                        },
                                      ],
                                    }}
                                    overlayStyle={{ width: 150, height: 260 }}
                                    trigger={["contextMenu"]}
                                    placement="bottomLeft"
                                  >
                                    <li
                                      key={note.uuid}
                                      className={getClassNames(
                                        `p-6 rounded cursor-pointer  ${theme === "dark" ? "bg-[#1d1c1c]" : "bg-[#fdf8f8]"}`)}>
                                      <p className="font-medium  text-lg flex items-center gap-2">
                                        {note.title}
                                      </p>
                                      <div className="flex gap-2.5 mt-2 text-xs text-gray-400">
                                        <div className="flex-1">
                                          <p className="truncate w-60">{note.content}</p>
                                        </div>
                                        <Dropdown
                                          menu={{
                                            items: [
                                              {
                                                key: '1',
                                                className: "p-2 ",
                                                label: "Restor",
                                                onClick: () => {
                                                  handelNoteTrashOut(note, idx)
                                                },
                                                icon: <ReloadOutlined />,
                                              },
                                              {
                                                key: '2',
                                                className: "p-2 ",
                                                label: "Delete",
                                                danger: true,
                                                onClick: () => {
                                                  handelNoteTrashDel(note, idx)
                                                },
                                                icon: <RestOutlined />,
                                              },
                                            ],
                                          }}
                                          overlayStyle={{ width: 150, height: 260 }}
                                          trigger={["click"]}
                                          placement="bottomLeft"
                                        >
                                          <MoreOutlined className='text-lg' />
                                        </Dropdown>
                                      </div>
                                    </li>
                                  </Dropdown>
                                ))}
                              </ul>
                            )
                            :
                            (
                              <Empty description={"empty trash"} />
                            )}

                    </Drawer>
                  </ConfigProvider>
                  <div className="text-md mb-2 cursor-pointer"
                    onClick={() => handelTrashopen()}
                  >
                    <RestOutlined /> Tarsh
                  </div>
                </div>
              </div>
            </aside >

            <div className={`block md:hidden ${!mobileSidebar ? 'fixed text-2xl p-0 z-0 top-0.5 left-1.5' : 'hidden'}`}
              onClick={() => setMobileSidebar(true)}>
              <AlignLeftOutlined className="" />
            </div>

            <NoteList foldernotes={openForder} />
            < main
              className={getClassNames(`h-screen hidden overflow-y-auto mdflex ${inOutlet ? "" : "items-center"} justify - center`)}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            </main>
            <div className={getClassNames(`${inOutlet ? "" : `${theme === "dark" ? "bg-[#242424]" : "bg-[#ffffff33]"}`}  fixed top-0 left-0 right-0 bottom-0  h-screen overflow-y-auto lg:static lg:h-auto lg:flex w-full`)}>
              <Outlet />
            </div>
          </div>
        </>
      )
      }
    </>);
};

export default HomeLayout;
