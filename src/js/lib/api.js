const API_ADDRESS = 'http://127.0.0.1:3000/api/clustering';

const request = (path) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_ADDRESS}/${path}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
      .then(res => res.ok ? res.json() : reject(new Error()))
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export function getHierarchicalCluster() {
  return request('hierarchical?format=jstree');
}

export function getKMeansClusters(aClusterCount, aIterCount) {
  return request(`k-means?format=jstree&iterations=${aIterCount}&clusters=${aClusterCount}`);
}
