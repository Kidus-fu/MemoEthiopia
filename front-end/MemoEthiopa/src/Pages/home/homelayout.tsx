import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import NoteList from './NoteList';
import { Outlet, useMatch, useNavigate, useParams } from 'react-router-dom';
import { CloseOutlined, FileDoneOutlined, FileTextOutlined, FolderAddFilled, FolderFilled, FolderOpenFilled, InboxOutlined, MenuOutlined, MoreOutlined, ReloadOutlined, RestOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import api from '../../api';
import { Avatar, Button, ConfigProvider, Drawer, Dropdown, Empty, Skeleton, Spin, theme as antdTheme } from 'antd';
import logo from '../../assets/MemoEthio_logo_4.png';
import { Folderitems, useUserMenuItems } from "./MenuPropsC"
import { fetchUserData } from '../../store/features/users/User';
import { useMessage } from '../../components/useMessage';
import AddNoteForm from './NewNoteForm';
import { useCreateAiNoteMutation } from '../../services/Notes/createNoteApi';
import MinNavbar from '../../components/home/minNavber';

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
  const [forlderloading, setForlderLoading] = useState(false)
  const [localoading, setLocaloading] = useState(false)
  const [openForder, setOpenForder]: any = useState(undefined);
  const [folders, setFolders] = useState<FolderState[]>([])
  const [trashedNotes, setTrashedNotes] = useState<any[]>([])
  const [sheardNotes, setSheardNotes] = useState<any[]>([])
  const [foldersName, setFoldersName]: any = useState()
  const [newFoldersName, setNewFoldersName]: any = useState()
  const [newFoldersNameC, setNewFoldersNameC]: any = useState()
  const [inOutlet, setInOutlet] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const [renamid, setRenameid]: any = useState()
  const [newfoldercreate, setNewfoldercreate] = useState(false)
  const folderinput = useRef<HTMLInputElement>(null)
  const folderinputnew = useRef<HTMLInputElement>(null)
  const [folderNameError, setFolderNameError] = useState(false)
  const [Trashopen, setTrashopen] = useState(false)
  const [sheardNoteopen, setSheardNoteopen] = useState(false)
  const [TrashedLoad, setTrashedLoad] = useState(false)
  const [sheardLoad, setSheardLoad] = useState(false)
  const match = useMatch("/feed/mynote/:uuid");
  const [mobileSidebar, setMobileSidebar] = useState(false)
  const { foldername } = useParams()
  const useritems = useUserMenuItems();
  const [createAiNote, { isLoading }] = useCreateAiNoteMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenforder = (name: string) => {
    const targetFolder: any = folders.find((folder) => folder.name === name);
    if (targetFolder) {
      setOpenForder(targetFolder); // update state
      navigate(`/feed/${targetFolder.name}`); // use directly
    }
  };


  useEffect(() => {
    document.title = `My Notes`;

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

  const handleNoteSubmit = async (values: any) => {
    navigate('/feed/')
    try {
      const payload = {
        user_prompt: values.prompt,
        metadata: {
          user_id: user.user,
          folder_id: values.folder,
          title: values.title,
        },
      };
      const response = await createAiNote(payload).unwrap();
      const resdata = response.created_note_md
      navigate(`/feed/${resdata.folder}/${resdata.note_uuid}/`)

      showMessage('success', 'AI Note created successfully!');
    } catch (error) {
      console.error(error);
      showMessage('error', 'Failed to create AI Note.');
    }
  };
  const getClassNames = (base: string) => {
    const border = DeveloperTest ? 'border border-red-700' : '';
    const themeStyle = theme === 'dark' ? ' bg-[#1C1C1C] text-white' : 'bg-[#F3F6FB] text-gray-600';
    return `${base} ${border} ${themeStyle}`;
  };
  useEffect(() => {
    setForlderLoading(true);
    if (!loggedIn) {
      window.location.href = "/"
    } else {
      setForlderLoading(true)
      api.get("api-v1/folders/")
        .then(res => {
          const data = res.data.results
          setFolders(data)
          if (foldername) {
            const newdata = data.filter((folder: any) => folder.name.toLowerCase().includes(foldername.toLowerCase()))
            setOpenForder(newdata[0]);
          }
          setForlderLoading(false)
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
    if (e.key == "3") {
      setIsModalOpen(true)
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
    folderinputnew.current?.focus();
    folderinputnew.current?.select();
  }, [newfoldercreate]);


  const handelSheardNoteopen = () => {
    setSheardNoteopen(true)
    setSheardLoad(true)
    api.get('api-v1/shared-notes/')
      .then((res: any) => {
        console.log(res);
        setSheardNotes(res.data)
      }).catch((error) => {
        console.error(error);
        showMessage('error', 'Something went wrong, please try again')
      }).finally(() => setSheardLoad(false))
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
              className="sm:h-60 sm:w-60 animate-scaleUp"
            />
            <Spin
              size="default"
              style={{
                fontSize: '36px',
                color: theme === 'dark' ? '#ffffffcc' : '#000000cc',
              }}
            />
            <p className="sm:text-xs text-gray-500 animate-pulse">
              Loading, please wait...
            </p>
          </div>
        </div>
      ) : (
        <>
          <Spin fullscreen tip={<p className='animate-pulse'>AI Ganerate</p>} spinning={isLoading} />
          <MinNavbar />

          <div className={getClassNames("sm:flex h-screen w-full overflow-y-auto")}
            onContextMenu={(e) => e.preventDefault()}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {localoading && <Spin fullscreen={true} tip='just a sec.' />}
            {/* Sidebar */}
            <aside className={getClassNames(` ${mobileSidebar ? 'fixed z-50 ease-in' : 'hidden'}   py-2 px-4 mb-3 h-screen lg:flex  flex-col overflow-y-auto `)} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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
                  <h1 className="text-xs font-bold mb-4">MemoEthiopia</h1>
                  <SearchOutlined />
                </div>

                <AddNoteForm onClose={() => setIsModalOpen(false)} folders={folders} theme={theme} open={isModalOpen} user={user} onSubmit={handleNoteSubmit} loading={isLoading} />
                <button className={getClassNames(`px-2 py-2 cursor-pointer w-full rounded mt-2 mb-4 text-center ${theme === "dark" ? "bg-[#3D3939]" : "bg-[#ffff]"} `)}
                  onClick={() => setIsModalOpen(true)}
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
                  <h2 className={getClassNames("sm:text-xs   text-gray-400")}>Recents</h2>
                  <button className={getClassNames("text-left sm:text-xs rounded my-1")}><FileTextOutlined /> Reflection on the Month of June</button>
                  <button className={getClassNames("text-left sm:text-xs rounded my-1")}><FileTextOutlined /> Reflection on the Month of June</button>
                </div>
                <div className="flex justify-between text-gray-400 " >
                  <h2 className="mt-4 sm:text-xs text-gray-400">Folders</h2>
                  <FolderAddFilled className='mt-4 cursor-pointer' onClick={() => {
                    if (!loading) {
                      setNewfoldercreate(true)
                      setNewFoldersNameC("")
                    }
                  }} />
                </div>
                <div className={`space-y-1 sm:text-xs overflow-y-auto mb-3 h-2/3 `} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {loading ? (
                    Array.from({ length: 4 }).map((_, idx) => (
                      <Skeleton.Input key={idx} className={getClassNames(`cursor-pointer w-full border border-transparent m-1 ${theme === "dark" ? "bg-transparent " : ""}   rounded   scale-100`)} />
                    ))
                  ) : (
                    <>
                      {newfoldercreate && <div className={getClassNames(`flex justify-between cursor-pointer border border-transparent px-2 py-2 `)} >
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
                            className={getClassNames(`outline-none w-3/4 p-1 sm:text-xs transition-all delay-150 ease-in ${theme == "dark" ? "bg-black/30" : "bg-white"} focus:ring-0 border  ${folderNameError ? "border-red-700" : "border-transparent"}`)} />
                          <br />
                          {
                            folderNameError && <small className={`text-center sm:text-xs ms-5 transition-all delay-300 ease-in ${theme === 'dark' ? "text-red-500" : "text-red-800"} `}>Folder name already taken.</small>
                          }
                        </p>
                      </div>}
                      <ConfigProvider
                        theme={{
                          algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                          components: {
                            Dropdown: {
                              paddingBlock: 10,
                              fontSize: 10
                            }
                          },
                        }}
                      >
                        {forlderloading ? (
                          <div className="space-y-4 p-4">
                            {[...Array(4)].map((_, idx) => (
                              <Skeleton
                                key={idx}
                                active
                                title={false}
                                className="rounded-lg"
                              />
                            ))}
                          </div>
                        ) : (
                          folders.map((folder) => (
                            <Dropdown
                              key={folder.id}
                              menu={
                                Folderitems
                                  ? {
                                    items: Folderitems,
                                    onClick: (e) => handelFolderitem(e, folder.id, folder.name)
                                  }
                                  : undefined
                              }
                              placement="bottom"
                              trigger={["contextMenu"]}
                            >
                              <div
                                className={getClassNames(
                                  `flex justify-between items-center cursor-pointer border border-transparent rounded px-3 py-2 transition-all duration-200 ${openForder === folder ? `${theme === "dark" ? "bg-gray-800 border-gray-800" : "bg-[#edf0f5] "} scale-105`
                                    : ""}
                                `)}
                              >
                                {renamid === folder.id ? (
                                  <div className="flex items-center gap-2 w-full">
                                    <FolderFilled className="pr-1" />
                                    <input
                                      value={newFoldersName}
                                      onChange={(e) => setNewFoldersName(e.target.value)}
                                      ref={folderinput}
                                      className={getClassNames(
                                        `outline-none p-1 w-full ${theme == "dark" ? "bg-black/30 text-white" : "bg-white"}`
                                      )}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          handelCloseInput(folder.id);
                                        } else if (e.key === 'Escape') {
                                          setRenameid(0);
                                        }
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <p
                                    className="flex items-center gap-2 w-full"
                                    onClick={() => {
                                      setMobileSidebar(false);
                                      setNewfoldercreate(false);
                                      setNewFoldersNameC("");
                                      handleOpenforder(folder.name);
                                      if (renamid !== 0) {
                                        setRenameid(0);
                                      }
                                    }}
                                    onTouchStart={() => {
                                      handleOpenforder(folder.name);
                                      setTimeout(() => {
                                        setMobileSidebar(false);
                                      }, 3000);
                                      setNewfoldercreate(false);
                                      setNewFoldersNameC("");
                                    }}
                                  >
                                    {openForder === folder ? <FolderOpenFilled /> : <FolderFilled />}
                                    {folder.name}
                                  </p>
                                )}

                                <Dropdown
                                  menu={
                                    Folderitems
                                      ? {
                                        items: Folderitems,
                                        onClick: (e) => handelFolderitem(e, folder.id, folder.name)
                                      }
                                      : undefined
                                  }
                                  placement="bottomRight"
                                  trigger={["click"]}
                                >
                                  <MoreOutlined
                                    className="cursor-pointer"
                                    onClick={() => {
                                      if (renamid !== 0) {
                                        setRenameid(0);
                                        setNewfoldercreate(false);
                                        setNewFoldersNameC("");
                                      }
                                    }}
                                  />
                                </Dropdown>
                              </div>
                            </Dropdown>
                          ))
                        )}
                      </ConfigProvider>

                    </>
                  )}
                </div>
                <div className={getClassNames("sticky bottom-3 left-0 right-0 p-2 ")}>
                  <div className="flex justify-between text-gray-400  cursor-pointer"
                    onClick={() => {
                      if (renamid !== 0) {
                        setRenameid(0)
                      }
                    }}>
                    <h2 className={getClassNames("mt-2 sm:text-xs font-semibold  text-gray-400")}>More</h2>
                  </div>
                  <div className={getClassNames("space-y-1 text-xs overflow-hidden mb-3 p-2 ")}
                    onClick={() => {
                      setNewfoldercreate(false)
                      setNewFoldersNameC("")
                      if (renamid !== 0) {
                        setRenameid(0)
                      }
                    }}>
                    <div className=" mb-2 cursor-pointer flex gap-1.5">
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
                        title="Sheard notes"
                        placement="left"
                        width={420}
                        onClose={() => setSheardNoteopen(false)}
                        open={sheardNoteopen}
                        closable={true}
                        bodyStyle={{ padding: "1rem", overflowY: "auto" }}
                      >
                        {
                          sheardLoad ?
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
                            : (

                              sheardNotes.length ?
                                (
                                  <ul className="space-y-4 px-2 w-full max-w-3xl mx-auto">
                                    {sheardNotes.map((note: any) => (
                                      <li
                                        key={note.uuid}
                                        className={`flex items-center justify-between gap-4 p-4 sm:p-5 rounded-lg shadow-sm transition-all cursor-pointer hover:shadow-md 
                                            ${theme === "dark" ? "bg-[#2b2a2a] text-white" : "bg-white text-gray-800"}`}
                                            onClick={() => {
                                              setSheardNoteopen(false)
                                              navigate(`/feed/getshear/${note.uuid}`)
                                            }}
                                      >
                                        {/* Avatar + User Info */}
                                        <div className="flex items-center gap-3">
                                          <Avatar icon={<UserOutlined />} />
                                          <div className="flex flex-col">
                                            <span className="text-sm font-semibold">Admin</span>
                                            <span className="text-xs text-gray-500">Permission: <strong>{note.permission}</strong></span>
                                          </div>
                                        </div>

                                        {/* Note Info */}
                                        <div className="flex-1 pl-4">
                                          <p className="text-base font-medium">{note.notetitle}</p>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>

                                )
                                :
                                (
                                  <Empty description={"empty trash"} />
                                ))
                        }
                      </Drawer>
                      <Drawer
                        title="Trased notes"
                        placement="left"
                        width={420}
                        onClose={() => setTrashopen(false)}
                        open={Trashopen}
                        closable={true}
                        bodyStyle={{ padding: "1rem", overflowY: "auto" }}
                      >
                        <div className={`flex justify-end items-end text-xs my-1  `}>
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
                                <ul className="space-y-3 px-1 w-auto ">
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
                                        <p className="font-medium  sm:text-sm flex items-center gap-2">
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
                    <div className=" mb-2 cursor-pointer"
                      onClick={() => handelTrashopen()}
                    >
                      <RestOutlined /> Tarsh
                    </div>
                    <div className=" mb-2 cursor-pointer"
                      onClick={() => handelSheardNoteopen()}
                    >
                      <FileTextOutlined /> Get Sheard Note
                    </div>
                  </div>
                </div>
              </div>
            </aside >

            <div
              className={getClassNames(`fixed md:hidden w-full  transition-transform duration-200  ${mobileSidebar ? 'hidden' : 'block'}`)}
            >
              <div className="flex justify-between gap-2 p-2">
                <MenuOutlined className="text-xl " onClick={() => setMobileSidebar(true)} />
                <div className="flex gap-2">
                  <ConfigProvider theme={{
                    algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                    components: {
                      Dropdown: {
                        paddingBlock: 10,
                        fontSize: 11
                      }
                    },
                  }}>

                    <Dropdown menu={{ items: useritems }} trigger={["click"]} placement="bottomLeft"
                      overlayStyle={{ width: 220, height: 220, borderRadius: 20 }}>
                      <div className={getClassNames("h-6 w-6 mt-1 bg-transparent rounded-full cursor-pointer  overflow-hidden flex items-center justify-center")}>
                        {user?.profile_picture ? (
                          <img
                            // src={`https://memoethiopia.onrender.com${user.profile_picture}`}
                            src={`https://placehold.co/150/?text=${user?.usermore?.username[0]}`}
                            alt="User Avatar"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <UserOutlined className={" text-lg "} />
                        )}
                      </div>
                    </Dropdown>
                  </ConfigProvider>
                </div>
              </div>
            </div>

            <div className={`pt-3 ${theme === "dark" ? "bg-[#1f1f1f]" : "bg-[#ECEEF0]"} sm:h-auto h-screen`}>
              <NoteList foldernotes={openForder} />
            </div>
            <div className={getClassNames(`${inOutlet ? "" : `${theme === "dark" ? "bg-[#242424]" : "bg-[#ffffff33]"}`}   top-0 left-0 z-0 right-0 bottom-0 overflow-y-auto lg:static lg:h-auto lg:flex w-full h-auto`)}>
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>);
};

export default HomeLayout;
