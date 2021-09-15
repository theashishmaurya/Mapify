import { useState } from 'react';

const EditNode = ({
  setIsSidebarActive,
  setSelectedNode,
  selectedNode,
  elements,
  setElements,
}) => {
  const [tempNode, setTempNode] = useState({
    style: { borderRadius: '0.375rem', padding: '10px 40px' },
    className: 'shadow-md bg-white',
    data: 'Edit me',
  });
  const HandleChange = (name) => (e) => {
    setTempNode({ ...tempNode, [name]: e.target.value });
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    // setSelectedNode({
    //   ...selectedNode,
    //   className: tempNode.className,
    //   style: tempNode.style,
    // });
    const className = tempNode.className;
    console.log('fine');
    setElements((els) =>
      els.map((el) => {
        if (el.id == selectedNode.id) {
          el.data = {
            ...el.data,
            label: tempNode.data,
          };
          el.className = className;
        }
        return el;
      })
    );
    setIsSidebarActive(true);
  };
  //fast
  return (
    <div className="mx-2">
      <div className="flex justify-start my-3">
        <button
          onClick={() => setIsSidebarActive(true)}
          className="rounded-full shadow-md p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
      </div>
      <div className="display bg-gray-100 py-10 shadow-md">
        <div className="flex justify-center">
          <div style={tempNode.style} className={tempNode.className}>
            {tempNode.data}
          </div>
        </div>
      </div>
      <div>
        <div className="data my-4">
          <label className="font-medium">Data</label>
          <input
            type="text"
            className="border-2 rounded-md mx-2 w-60 shadow-md "
            name="data"
            onChange={HandleChange('data')}
          />
        </div>
        <div className="style font-medium my-6">
          Enter the tailwind classes here to Style your nodes:
        </div>
        <textarea
          name="style"
          id="classname"
          className="my-2"
          cols="10"
          rows="5"
          className="w-full border-2 shadow-md"
          onChange={HandleChange('className')}
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button
          className="p-3 px-6 bg-blue-600 text-white my-2 rounded-md"
          onClick={HandleSubmit}
        >
          Update
        </button>
      </div>
    </div>
  );
};
export default EditNode;
