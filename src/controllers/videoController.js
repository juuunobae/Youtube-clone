let videos = [
  {
    id: 1,
    title: "First Video",
    rating: 4,
    comments: 3,
    createAt: "2 minutes ago",
    views: 89,
  },
  {
    id: 2,
    title: "Second Video",
    rating: 4,
    comments: 3,
    createAt: "2 minutes ago",
    views: 89,
  },
  {
    id: 3,
    title: "Third Video",
    rating: 4,
    comments: 3,
    createAt: "2 minutes ago",
    views: 89,
  },
];

export const trending = (req, res) => res.render("home", { pageTitle: "Home", videos });

export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching: ${video.title}`, video });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = (req, res) => {
  //  ...
  const { title } = req.body;
  const newVideo = {
    title,
    rating: 3,
    comments: 1,
    createAt: "just now",
    views: 54,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
