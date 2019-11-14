import $ from "jquery";
import "jstree";
import { getHierarchicalCluster, getKMeansClusters } from "./js/lib/api";

const hierarchId = "Hierarchical";
const kmeansId = "K-Means";

const state = {
  method: "Hierarchical",
  clusters: 5,
  iterations: 20,
  loaded: false
};

// First time in my life that I have used jQuery.
// I doubt that this is the optimal way of doing things.

const methodSelection = $("#cluster-type-select");
const clusterCountInput = $("#cluster-count-input");
const iterationCountInput = $("#iteration-count-input");
const progressBar = $("#progress-bar");
const jstree = $("#jstree");
const goButton = $("#go-button");

const displayTree = aData => {
  const format = {
    core: {
      data: [
        ...aData
      ]
    }
  };

  jstree.jstree(format);
};

const doDisplayTree = async () => {
  if (state.loaded) {
    jstree.jstree(true).destroy();
  }

  progressBar.show();

  const result = state.method === "Hierarchical"
    ? [(await getHierarchicalCluster())]
    : await getKMeansClusters(state.clusters, state.iterations);

  state.loaded = true;
  progressBar.hide();
  displayTree(result);
};

methodSelection.change(() => {
  const value = $("option:selected", methodSelection).text();
  state.method = value;

  if (value === hierarchId) {
    clusterCountInput.prop("disabled", true);
    iterationCountInput.prop("disabled", true);
  } else {
    clusterCountInput.prop("disabled", false);
    iterationCountInput.prop("disabled", false);
  }
});
clusterCountInput.change(() => (state.clusters = clusterCountInput.val()));
iterationCountInput.change(() => (state.iterations = iterationCountInput.val()));
goButton.click(() => doDisplayTree());

progressBar.hide();
