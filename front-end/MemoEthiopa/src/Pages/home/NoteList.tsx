import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import React, { useEffect, useState } from "react";
import { ConfigProvider, Dropdown, Result, theme as antdTheme } from "antd";
import { FolderOpenFilled } from "@ant-design/icons";
import { useNoteItems } from "./MenuPropsC";




interface FoldernotesState {
  foldernotes: any;
}
const NoteList: React.FC<FoldernotesState> = ({ foldernotes }) => {
  const navigate = useNavigate();
  const [selectNote, setSelect] = useState("");
  const [notes, setNotes]: any = useState();
  const [loading, setLoading] = useState(true);
  const noteitems = useNoteItems()
  const theme = useSelector((state: RootState) => state.theam.theme);
  const DeveloperTest = useSelector((state: RootState) => state.developertest.border_test);

  const getClassNames = (base: string) => {
    const border = DeveloperTest ? "border border-red-700" : "";
    const themeStyle =
      theme === "dark" ? " bg-[#1f1f1f] text-white" : "bg-[#ECEEF0] text-black";
    return `${base} ${border} ${themeStyle}`;
  };

  useEffect(() => {
    if (foldernotes) {
      setNotes(foldernotes.notes)
      setLoading(false)
    }
  }, [foldernotes])


  return (
    <>
      {foldernotes ? (
        <div
          className={getClassNames(`md:h-screen w-auto  `)}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <section className={getClassNames("w-full  overflow-y-auto py-8 ")}>
            <h2 className={getClassNames("text-xl font-semibold mb-4 mx-5")}>
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
                <li
                  className={getClassNames(`p-6 rounded cursor-pointer`)}>
                  <div className="flex gap-2.5 mt-2 text-xs text-gray-400">
                    <div className="flex-1">
                      <p className="truncate w-60">
                        not found
                      </p>
                    </div>
                  </div>
                </li>
              ) : (
                <>
                  {notes.map((note: any) => (
                    <ConfigProvider theme={{
                      algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                      components: {
                        Dropdown: {
                          paddingBlock: 10,
                        }
                      },
                    }}>
                      <Dropdown menu={{ items: noteitems }}
                        overlayStyle={{ width: 180, height: 250 }}
                        trigger={["contextMenu"]} placement="bottomLeft" >
                        <li
                          key={note.uuid}
                          className={getClassNames(`p-6 rounded cursor-pointer ${selectNote === note.uuid
                            ? theme === "dark"
                              ? "bg-[#3D3939]"
                              : "bg-[#fdf8f8]"
                            : theme === "dark"
                              ? "bg-[#232323] hover:bg-[#3D3939]"
                              : "bg-white hover:bg-[#f3f3f3] text-gray-700"
                            }`)}
                          onContextMenu={(e) => {
                            e.preventDefault();
                          }}
                          onClick={() => {
                            setSelect(note.uuid);
                            navigate(`/feed/mynote/${note.uuid}`);
                          }}
                        >
                          <p className="font-medium text-lg">{note.title}</p>
                          <div className="flex gap-2.5 mt-2 text-xs text-gray-400">
                            <div className="flex-1">
                              <p className="truncate w-60">
                                {note.content}
                              </p>
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
        </div>
      ) : (
        <div
          className={getClassNames("hidden w-90 md:block h-screen overflow-auto")}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <section className={getClassNames(" overflow-y-auto py-8")}>
            <div className={getClassNames("h-full mt-40 flex items-center justify-center")}>
              <Result
                icon={<FolderOpenFilled />}
                title="Select a Folder to view"
                extra={<p>Choose a Folder from the list on the left to view its contents, or create a new Folder to add to your collection.</p>}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default NoteList;
