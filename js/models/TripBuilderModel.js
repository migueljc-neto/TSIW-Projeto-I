var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

/* Sortabel Lists */
new Sortable(document.getElementById("destinationSortableList"), {
  group: {
    name: "destinationListGroup",
  },

  animation: 150,

  onAdd: function (cell) {
    console.log(cell.item);
    item = cell.item;

    console.log(item.innerHtml);

    /* const item = cell.item; */
    /* item.classlist.remove("bg-white", "p-4", "rounded");

    item.classlist.add("") */
    /* 
    class="pr-10 pl-5 bg-[#39578A] focus:bg-[#6C6EA0] text-white h-20 w-full flex items-center justify-between rounded-lg" */
  },
});

new Sortable(document.getElementById("destinationSortableListView"), {
  group: {
    name: "destinationListGroup",
    pull: "clone",
    put: "false",
    sort: "false",
  },
  animation: 150,
});
