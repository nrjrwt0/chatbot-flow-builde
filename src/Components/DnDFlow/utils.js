export const getId = () => `dndnode_${crypto.randomUUID()}`;

export const saveFlowToLocalStorage = (nodes, edges) => {
  localStorage.setItem('flowNodes', JSON.stringify(nodes));
  localStorage.setItem('flowEdges', JSON.stringify(edges));
};

export const retrieveFlowFromLocalStorage = () => {
  const nodes = JSON.parse(localStorage.getItem('flowNodes'));
  const edges = JSON.parse(localStorage.getItem('flowEdges'));
  return { nodes, edges };
};

export const removeFlowFromLocalStorage = () => {
  localStorage.removeItem('flowNodes');
  localStorage.removeItem('flowEdges');
};
