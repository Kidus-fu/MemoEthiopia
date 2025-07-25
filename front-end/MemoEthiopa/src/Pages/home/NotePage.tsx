import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import api from "../../api";
import dayjs from "dayjs";
import { ConfigProvider, Dropdown, Modal, Spin, theme as antdTheme } from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeftOutlined, CloseOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined,  FolderOutlined, InboxOutlined, InfoCircleOutlined, ScheduleOutlined, ShareAltOutlined } from "@ant-design/icons";
import { useMessage } from "../../components/useMessage";
import NoteDetail from "./NoteDetail";

export interface UserInfo {
  bio: string;
  email: string;
  id: number;
  paln: string;
  profile_picture: string;
  username: string;
  uuid: string;
  phone_number: string;
  location: string;
  date_of_birth: string;
  gender: string;
  social_links: string[];
  preferred_language: string;
}

export interface NoteItem {
  absolute_url: string;
  category: number;
  color: string;
  content: string;
  created_at: string;
  file: string | null;
  folder: number;
  folder_name: string;
  is_trashed: boolean;
  id: number;
  image: string | null;
  is_archived: boolean;
  is_pinned: boolean;
  title: string;
  updated_at: string;
  user_info: UserInfo;
  uuid: string;
}

const NotePage = () => {
  const { noteId } = useParams();
  const theme = useSelector((state: RootState) => state.theam.theme);
  const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);
  const navigate = useNavigate();
  const [note, setNote] = useState<NoteItem>();
  const [loading, setLoading] = useState(true);
  const [Notedetail, setNotedetail] = useState(false);
  const showMessage = useMessage()
  useEffect(() => {
    setLoading(true);
    api(`api-v1/notes/${noteId}/`)
      .then((resp: any) => setNote(resp.data))
      .finally(() => setLoading(false));
  }, [noteId]);

  const getClassNames = (base: string) => {
    const border = DeveloperTest ? "border border-red-700" : "";
    const themeStyle = theme === "dark" ? "bg-[#1C1C1C] text-white" : "bg-[#F3F6FB] text-black";
    return `${base} ${border} ${themeStyle}`;
  };

  const handelArchived = (noteuuid: any, note_isarchived: any, notecontent: any, notetitle: any) => {
    setLoading(true)
    api.patch(`api-v1/notes/${noteuuid}/`,
      {
        'content': notecontent,
        'title': notetitle,
        "is_archived": !note_isarchived
      }
    )
      .then(() => {
        showMessage("success", `${note_isarchived ? 'unArchived ' + notetitle : 'Archived ' + notetitle}`)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)

      })
  }
  const handelTrash = (noteuuid: any, notecontent: any, notetitle: any) => {
    setLoading(true)
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
        setLoading(false)
      })
      .catch((err: any) => {
        setLoading(false)
        console.error(err)
      })
  }

  return (
    <div
      className="fixed md:relative top-0 w-full z-0 h-full m-0 overflow-auto overflow-x-hidden sm:text-xs"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {loading ? (
        <div className={getClassNames("h-screen w-full cursor-progress flex items-center justify-center")} title="wait a min">
          <Spin fullscreen={true} />
        </div>
      ) : (
        <>
          <ConfigProvider theme={{
            algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
            components: {},
            token: {
              colorBgMask: "rgb(1, 1, 1,0.7)"
            }
          }}>
            <Modal
              title="Detail"
              closable={{ 'aria-label': 'Custom Close Button' }}
              open={Notedetail}
              onClose={() => setNotedetail(false)}
              closeIcon={<CloseOutlined onClick={() => setNotedetail(false)} />}
              width={550}
              footer={
                null
              }
            >
              {note && <NoteDetail note={note} />}
            </Modal>
          </ConfigProvider>
          <div className={getClassNames("min-h-screen w-full")}>
            {/* Header */}
            <div className={getClassNames("sticky top-0 z-40 w-full sm:text-xs ")}>
              <div className="flex justify-between items-center p-2 sm:text-xs">
                <div
                  className="sm:text-xs cursor-pointer"
                  title="back"
                  onClick={() => navigate(`/feed/${note?.folder_name}`)}
                >
                  <ArrowLeftOutlined />
                </div>
                <h1 className="text-lg md:text-2xl font-bold text-center truncate max-w-[60%]">
                  {note?.title}
                </h1>
                <div>
                  <ConfigProvider
                    theme={{
                      algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                      components: { Dropdown: { 
                        paddingBlock: 10,
                        fontSize: 10 
                      } },
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
                            key: '3',
                            className: "p-2 ",
                            label: "Detiles",
                            icon: <InfoCircleOutlined />,
                            onClick: () => setNotedetail(true)
                          },
                          {
                            key: '7',
                            className: "p-2 opacity-50",
                            label: "Share",
                            icon: <ShareAltOutlined />,
                          },
                          {
                            key: '4',
                            className: `p-2`,
                            label: `${note?.is_archived ? 'unArchived' : 'Archived'}`,
                            icon: note?.is_archived ? <InboxOutlined className="opacity-20" /> : <InboxOutlined />,
                            onClick: () => handelArchived(note?.uuid, note?.is_archived, note?.content, note?.title)
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
                              handelTrash(note?.uuid, note?.content, note?.title)
                              navigate(`/feed/`);
                            }
                          }
                        ],
                      }}
                      overlayStyle={{ width: 180, height: 250 }}
                      trigger={["click"]}
                      placement="bottomLeft"
                    >
                      <div className="rounded-full flex justify-center cursor-pointer">
                        <EllipsisOutlined className="sm:text-xs" />
                      </div>
                    </Dropdown>
                  </ConfigProvider>
                </div>
              </div>
            </div>

            {/* Created Date */}
            <div
              className={`text-sm m-2 flex flex-wrap gap-4 md:gap-10 p-5 border-b ${theme === "dark" ? "border-gray-800" : "border-gray-300"
                }`}
            >
              <div className="flex gap-2 items-center">
                <ScheduleOutlined /> <p>Date</p>
              </div>
              <p className="underline" title={note?.created_at}>
                {dayjs(note?.created_at).format("DD/MM/YYYY")}
              </p>
            </div>

            {/* Folder */}
            <div
              className={`sm:text-xs text-md m-2 flex flex-wrap gap-4 md:gap-10 p-5 border-b ${theme === "dark" ? "border-gray-800" : "border-gray-300"
                }`}
            >
              <div className="flex gap-2 items-center">
                <FolderOutlined /> <p>Folder</p>
              </div>
              <p className="underline">{note?.folder_name}</p>
            </div>

            {/* Markdown Content */}
            <div className={getClassNames("text-base w-full whitespace-pre-line break-words caption-top p-4 sm:text-xs")}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: (props) => <h1 className="text-2xl font-bold mt-6 mb-3" {...props} />,
                  h2: (props) => <h2 className="text-xl font-bold mt-5 mb-2" {...props} />,
                  h3: (props) => <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />,
                  p: (props) => (
                    <p className="text-base leading-6 sm:text-sm my-2 break-words" {...props} />
                  ),
                  hr: (props) => (
                    <hr
                      className={`my-7 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-300"
                        }`}
                      {...props}
                    />
                  ),
                  code: (props) => {
                    const { className, children, ...rest } = props as any;
                    const inline = !className;
                    return inline ? (
                      <code
                        className={`px-1 py-0.5 rounded font-mono text-sm ${theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
                          }`}
                        {...rest}
                      >
                        {children}
                      </code>
                    ) : (
                      <pre
                        className={`my-4 p-4 rounded overflow-x-auto text-sm font-mono ${theme === "dark" ? "bg-[#272727] text-white" : "bg-[#eff2f3] text-black"
                          }`}
                      >
                        <code>{children}</code>
                      </pre>
                    );
                  },
                  a: (props) => (
                    <a
                      className="text-blue-600 underline hover:text-blue-800 break-all sm:text-sm"
                      target="_blank"
                      rel="noreferrer"
                      {...props}
                    />
                  ),
                }}
              >
                {note?.content || ""}
              </ReactMarkdown>

            </div>
          </div>
        </>
      )}
    </div>

  );
};

export default NotePage;
