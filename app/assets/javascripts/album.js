$(document).ready(function() {
  getAlbumIndex(); // .../albums
  getNewAlbum();
  getEditAlbum();
  postNewAlbum();
  postEditAlbum();
  clickOnAlbum();
  deleteAlbum();
  sortAlbumAttr();
});

/////// click on nav bar link for Albums ///////
const getAlbumIndex = () => {
  $(document).on("click", "#album_index", function(e) {
    getRouteResponse(e, this);
  });
};

const sortAlbumAttr = () => {
  $("#obj_sort_attr").on("click", function(e) {
    e.preventDefault();
    fetch(`/albums.json`)
      .then(res => res.json())
      .then(albums => {
        $("tbody").empty();
        const sortedAlbums = albums.sort(compare);
        sortedAlbums.forEach(album => {
          const newAlbum = new Album(album);
        });
      });
  });
};

///// ADD Albums to the Table /////
function getAlbums() {
  fetch(`/albums.json`)
    .then(res => res.json())
    .then(albums => {
      albums.forEach(album => {
        const newAlbum = new Album(album);
        const theTableData = newAlbum;
        tableContent(`${theTableData}`);
      });
    })
    .then(() => sortAlbumAttr())
    .then(() => deleteAlbum());
}

/////// click on "add new album" button ///////
const getNewAlbum = () => {
  $(document).on("click", "#add_album", function(e) {
    getFormAndResponses(e, this);
  });
};

const getEditAlbum = () => {
  $(document).on("click", "#update_album", function(e) {
    getFormAndResponses(e, this);
  });
};

const postNewAlbum = () => {
  $(document).on("submit", "form#new_album", function(e) {
    e.preventDefault();
    postingAlbumAjax(this);
  });
};

const postEditAlbum = () => {
  $(document).on("submit", "form.edit_album", function(e) {
    e.preventDefault();
    postingAlbumAjax(this);
  });
};

function postingAlbumAjax(theSubmission) {
  const $form = $(theSubmission);
  const action = $form.attr("action");
  const data = $form.serialize();
  $.ajax({
    type: "POST",
    url: action,
    data: data,
    success: function(data) {
      const theHeader = $(data).find("#the_albums");
      const getButton = $(data).find("#update_album");
      const getButtonId = getButton.attr("data-id");
      albumShow(getButtonId);
    },
    error: function() {
      alert("Hm... something didn't work.");
    }
  });
}

//// delete album /////
const deleteAlbum = () => {
  $(".delete_album").on("click", function(e) {
    e.preventDefault();
    const deleteObj = this;
    const delete_id = $(deleteObj).attr("data-id");
    const action = $(deleteObj).attr("href");
    if (confirm("Are you sure you want to delete this Album?")) {
      $.ajax({
        type: "POST",
        url: action,
        // data: {_method: 'delete'},
        data: delete_id,
        success: function(data) {
          alert("The Album has been successfully deleted!");
          $("tr").destroy();
        }
      });
    } else {
      alert("You're keeping this Album.");
    }
  });
};

///////////////// Object Constructor/////////////////
class Album {
  constructor(attributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.phone = attributes.phone;
    this.email = attributes.email;
    this.address = attributes.address;
    this.avatar = attributes.avatar;
  }

  buildHtml() {
    return (
      <h4>
        <a href="albums/${this.id}">
          ${this.name} | ${this.phone} | Email: ${this.email} | Address: $
          {this.address}
        </a>
      </h4>
    );
  }
}
