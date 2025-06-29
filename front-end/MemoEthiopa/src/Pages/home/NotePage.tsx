import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import api from "../../api";
import dayjs from "dayjs";
import { ConfigProvider, Dropdown, Spin, theme as antdTheme } from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeftOutlined, EllipsisOutlined, FolderFilled, ScheduleOutlined } from "@ant-design/icons";
import { useNoteItems } from "./MenuPropsC";
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
  const noteitems = useNoteItems()
  const navigate = useNavigate();
  const [note, setNote] = useState<NoteItem>();
  const [loading, setLoading] = useState(true);
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

  return (
   <div
  className="fixed md:relative top-0 w-full h-full m-0 overflow-auto overflow-x-hidden"
  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
>
  {loading ? (
    <div className={getClassNames("h-screen w-full flex items-center justify-center")}>
      <Spin fullscreen={true} />
    </div>
  ) : (
    <div className={getClassNames("min-h-screen w-full")}>
      {/* Header */}
      <div className={getClassNames("sticky top-0 z-40 w-full ")}>
        <div className="flex justify-between items-center p-2">
          <div
            className="text-lg cursor-pointer"
            title="back"
            onClick={() => navigate('/feed')}
          >
            <ArrowLeftOutlined />
          </div>
          <h1 className="text-xl md:text-3xl font-bold text-center truncate max-w-[60%]">
            {note?.title}
          </h1>
          <div>
            <ConfigProvider
              theme={{
                algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                components: { Dropdown: { paddingBlock: 10 } },
              }}
            >
              <Dropdown
                menu={{ items: noteitems }}
                overlayStyle={{ width: 180, height: 250 }}
                trigger={["click"]}
                placement="bottomLeft"
              >
                <div className="rounded-full flex justify-center cursor-pointer">
                  <EllipsisOutlined className="text-2xl" />
                </div>
              </Dropdown>
            </ConfigProvider>
          </div>
        </div>
      </div>

      {/* Created Date */}
      <div
        className={`text-sm m-2 flex flex-wrap gap-4 md:gap-10 p-5 border-b ${
          theme === "dark" ? "border-gray-800" : "border-gray-300"
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
        className={`text-sm m-2 flex flex-wrap gap-4 md:gap-10 p-5 border-b ${
          theme === "dark" ? "border-gray-800" : "border-gray-300"
        }`}
      >
        <div className="flex gap-2 items-center">
          <FolderFilled /> <p>Folder</p>
        </div>
        <p className="underline">{note?.folder}</p>
      </div>

      {/* Markdown Content */}
      <div className={getClassNames("text-base w-full whitespace-pre-line break-words caption-top p-4")}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-3" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-5 mb-2" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
            p: ({ node, ...props }) => (
              <p className="text-base leading-6 my-2 break-words" {...props} />
            ),
            hr: ({ node, ...props }) => (
              <hr
                className={`my-7 border-t ${
                  theme === "dark" ? "border-gray-700" : "border-gray-300"
                }`}
                {...props}
              />
            ),
            code: ({ inline, children, ...rest }) => {
              return !inline ? (
                <pre
                  className={`my-4 p-4 rounded overflow-x-auto text-sm font-mono ${
                    theme === "dark" ? "bg-[#272727] text-white" : "bg-[#eff2f3] text-black"
                  }`}
                >
                  <code>{children}</code>
                </pre>
              ) : (
                <code
                  className={`px-1 py-0.5 rounded font-mono text-sm ${
                    theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
                  }`}
                  {...rest}
                >
                  {children}
                </code>
              );
            },
            a: ({ node, ...props }) => (
              <a
                className="text-blue-600 underline hover:text-blue-800 break-all"
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
  )}
</div>

  );
};

export default NotePage;
