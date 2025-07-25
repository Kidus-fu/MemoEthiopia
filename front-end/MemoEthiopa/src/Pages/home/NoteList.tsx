import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import React, { useEffect, useState } from "react";
import { ConfigProvider, Dropdown, Result, Spin, theme as antdTheme } from "antd";
import { DeleteOutlined, EditOutlined, EyeFilled, FolderOpenFilled, InboxOutlined, PushpinFilled } from "@ant-design/icons";
import api from "../../api";
import { useMessage } from "../../components/useMessage";

interface FoldernotesState {
  foldernotes: any;
}

const NoteList: React.FC<FoldernotesState> = ({ foldernotes }) => {
  const navigate = useNavigate();
  const [selectNote, setSelect] = useState("");
  const [notes, setNotes]: any = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useSelector((state: RootState) => state.theam.theme);
  const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
  const [localoading, setLocaloading] = useState(false)
  const showMessage = useMessage()
  

  const getClassNames = (base: string) => {
    const border = DeveloperTest ? "border border-red-700" : "";
    const themeStyle =
      theme === "dark" ? "text-white" : "text-black";
    return `${base} ${border} ${themeStyle}`;
  };
  

  useEffect(() => {
    if (foldernotes) {
      // Sort notes so that pinned notes appear first
      const sortedNotes = [...foldernotes.notes].sort((a, b) => {
        if (a.is_pinned && !b.is_pinned) return -1;
        if (!a.is_pinned && b.is_pinned) return 1;
        return 0; // retain original order otherwise
      });

      setNotes(sortedNotes);
      setLoading(false);
    }
  }, [foldernotes]);
  const handelArchived = (noteuuid: string, note_isarchived: boolean, notecontent: string, notetitle: string) => {
    setLocaloading(true)
    api.patch(`api-v1/notes/${noteuuid}/`,
      {
        'content': notecontent,
        'title': notetitle,
        "is_archived": !note_isarchived
      }
    )
      .then(() => {
        showMessage("success", `${note_isarchived ? 'unArchived ' + notetitle : 'Archived ' + notetitle}`)
      })
      .catch((err) => {
        console.log(err);

      })
      .finally(() => {
        api.get("api-v1/folders/")
          .then(res => {
            if (res.status === 200) {
              const data = res.data.results
              const newdata = data.filter((folder: any) => folder.name.toLowerCase().includes(foldernotes.name.toLowerCase()))

              const sortedNotes = [...newdata[0].notes].sort((a, b) => {
                if (a.is_pinned && !b.is_pinned) return -1;
                if (!a.is_pinned && b.is_pinned) return 1;
                return 0; // retain original order otherwise
              });

              setNotes(sortedNotes);
              setLocaloading(false)
            } else {
              console.error("get error to fauch a notes")
            }
          })
        setLoading(false)
      })
  }
  const handelTrash = (noteuuid: string, notecontent: string, notetitle: string) => {
    setLocaloading(true)
    api.patch(`api-v1/notes/${noteuuid}/`,
      {
        'content': notecontent,
        'title': notetitle,
        "is_trashed": true
      }
    )
      .then((res) => {
        console.log(res);
        showMessage("success", `Note ${notetitle} is go to trash`)
      })
      .finally(() => {
        api.get("api-v1/folders/")
          .then(res => {
            if (res.status === 200) {
              const data = res.data.results
              const newdata = data.filter((folder: any) => folder.name.toLowerCase().includes(foldernotes.name.toLowerCase()))

              const sortedNotes = [...newdata[0].notes].sort((a, b) => {
                if (a.is_pinned && !b.is_pinned) return -1;
                if (!a.is_pinned && b.is_pinned) return 1;
                return 0; // retain original order otherwise
              });

              setNotes(sortedNotes);
              setLocaloading(false)
            } else {
              console.error("get error to fauch a notes")
            }
          })
        setLoading(false)
      })
  }
  return (
    <>
        {localoading && <Spin fullscreen={true} tip='just a sec.' />}
      {foldernotes ? (
        <div
          className={getClassNames(`  w-auto sm:text-sm`)}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <section className={getClassNames("w-full overflow-y-auto py-8")}>
            <h2 className={getClassNames("sm:text-md font-semibold mb-4 mx-5")}>
              {foldernotes.name || "All Notes"}
            </h2>

            <ul className="space-y-3 px-2 w-auto">
              {loading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <li
                    key={idx}
                    className="p-4 rounded bg-gray-200 dark:bg-[#2a2a2a] animate-pulse h-24"
                  >
                    <div className="h-4 w-3/4 bg-gray-300 dark:bg-[#444] mb-2 rounded" />
                    <div className="h-3 w-1/2 bg-gray-300 dark:bg-[#555] rounded" />
                  </li>
                ))
              ) : notes.length === 0 ? (
                <li className={getClassNames(`p-6 rounded cursor-pointer`)}>
                  <div className="flex gap-2.5 mt-2 sm:text-xs text-gray-400">
                    <div className="flex-1">
                      <p className="truncate w-60">not found</p>
                    </div>
                  </div>
                </li>
              ) : (
                <>
                  {notes.map((note: any) => (
                    <ConfigProvider
                      key={note.uuid}
                      theme={{
                        algorithm:
                          theme === "dark"
                            ? antdTheme.darkAlgorithm
                            : antdTheme.defaultAlgorithm,
                        components: {
                          Dropdown: { 
                            paddingBlock: 10,
                            fontSize: 11,
                          },
                        },
                        token: {
                          colorBgMask: "rgb(1, 1, 1,0.7)"
                        }
                      }}
                    >

                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: '1',
                              className: "p-2 opacity-35",
                              label: "Edit",
                              icon: <EditOutlined />,
                            },
                            {
                              key: '2',
                              className: "p-2 ",
                              label: "Open",
                              icon: <EyeFilled />,
                              onClick: () => {
                                setSelect(note.uuid);
                                navigate(`/feed/${foldernotes.name}/${note.uuid}`);
                              }
                            },

                            {
                              key: '4',
                              className: `p-2`,
                              label: `${note.is_archived ? 'unArchived' : 'Archived'}`,
                              icon: note.is_archived ? <InboxOutlined className="opacity-20" /> : <InboxOutlined />,
                              onClick: () => handelArchived(note.uuid, note.is_archived, note.content, note.title)
                            },
                            {
                              key: '5',
                              type: 'divider'
                            },
                            {
                              key: '6',
                              label: 'Add to Trash',
                              icon: <DeleteOutlined />,
                              danger: true,
                              onClick: () => {
                                handelTrash(note.uuid, note.content, note.title)
                                navigate(`/feed/`);
                              }
                            }
                          ],
                        }}
                        overlayStyle={{ width: 180, height: 250 }}
                        trigger={["contextMenu"]}
                        placement="bottomLeft"
                      >
                        <li
                          key={note.uuid}
                          className={getClassNames(
                            `p-6 rounded cursor-pointer sm:text-xs  ${selectNote === note.uuid
                              ? theme === "dark"
                                ? "bg-[#3D3939]"
                                : "bg-[#fdf8f8]"
                              : theme === "dark"
                                ? "bg-[#232323] hover:bg-[#3D3939]"
                                : "bg-white hover:bg-[#f3f3f3] text-gray-700"
                            }`
                          )}
                          onContextMenu={(e) => e.preventDefault()}
                          onClick={() => {
                            setSelect(note.uuid);
                            navigate(`/feed/${foldernotes.name}/${note.uuid}`);
                          }}
                          title={`${note.title} ${note.is_pinned ? '~ Pinned' : ''}`}
                        >
                          <p className="font-medium  sm:text-xs flex items-center gap-2">
                            {note.is_pinned && (
                              <span className="text-sm opacity-55"><PushpinFilled /></span>
                            )}
                            {note.title}
                          </p>
                          <div className="flex gap-2.5 mt-2 sm:text-xs text-gray-400">
                            <div className="flex-1">
                              <p className="truncate w-60 sm:text-xs">{note.content}</p>
                            </div>
                          </div>
                        </li>
                      </Dropdown>
                    </ConfigProvider>
                  ))}
                </>
              )}
            </ul>
          </section>
        </div >
      ) : (
        <div
          className={getClassNames("w-full sm:w-80 h-screen overflow-auto")}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <section className={getClassNames("overflow-y-auto ")}>
            <div
              className={getClassNames(
                "h-full mt-20 sm:text-sm flex items-center justify-center"
              )}
            >
              <Result
                icon={<FolderOpenFilled />}
                className=""
                title="Select a Folder to view"
                extra={
                  <p className=" text-sm">
                    Choose a Folder from the list on the left to view its
                    contents, or create a new Folder to add to your collection.
                  </p>
                }
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default NoteList;
