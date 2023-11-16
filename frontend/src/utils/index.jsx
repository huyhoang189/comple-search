//function for create tree
const generateChildNodes = (arr, parentId) => {
  let outputs = [];
  let index = 1;
  for (let element of arr) {
    if (element.parent?._id === parentId) {
      let children = generateChildNodes(arr, element._id);

      let node = {
        title: `${element?.name} - ${element?.parent?.shortName || "BQP"}`,
        value: element._id,
        ...element,
      };

      if (children) {
        node.children = children;
      }

      outputs.push(node);
      index++;
    }
  }
  return outputs;
};

const generateTrees = (arr) => {
  let trees = [];
  let index = 1;
  for (let element of arr) {
    if (element.parent === null) {
      let node = {
        children: [],
        value: element._id,
        title: `${element?.name} - ${element?.parent?.shortName || "BQP"}`,
        ...element,
      };
      trees.push(node);
      index++;
    }
  }
  trees.forEach((element, index) => {
    let child = generateChildNodes(arr, element._id);
    trees[index].children = [...child];
  });
  return trees;
};

const formatDateAndTime = (inputDate) => {
  const date = new Date(inputDate);

  // Extract date components
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = date.getFullYear();

  // Extract time components
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  // Format the date and time
  const formattedDateAndTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  return formattedDateAndTime;
};

export { generateTrees, formatDateAndTime };
