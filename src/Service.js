var token = "";

// USER
export const UserLogin = async (username, password) => {
  let dataJson = JSON.stringify({
    Username: username,
    Password: password,
  });

  let res = await fetch(`http://125.234.238.103/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "LOGIN_SUCCESSFUL") {
    return res;
  } else {
    return res.message;
  }
};

export const getToken = () => {
  if (!token) {
    return sessionStorage.getItem("token");
  }
};

export const AddUser = async (
  username,
  password,
  role,
  avatar,
  name,
  phone,
  email,
  aboutme,
  position,
  title,
  department,
  education,
  office,
  major,
  language,
  research,
  supervision,
  publication,
  teachingcourse,
  onCancel = () => {}
) => {
  let token = getToken();
  let dataJson = JSON.stringify({
    Username: username,
    Password: password,
    Role: role,
    Avatar: avatar,
    Name: name,
    Phone: phone,
    Email: email,
    Aboutme: aboutme,
    Position: position,
    Title: title,
    Department: department,
    Education: education,
    Office: office,
    Major: major,
    Language: language,
    Research: research,
    Supervision: supervision,
    Publication: publication,
    TeachingCourse: teachingcourse,
  });
  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/user/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "ADD_SUCCESSFUL") {
    onCancel();
    return res;
  } else {
    return null;
  }
};

export const UpdateUser = async (
  id,
  role,
  avatar,
  name,
  phone,
  email,
  aboutme,
  position,
  title,
  department,
  education,
  office,
  major,
  language,
  research,
  supervision,
  publication,
  teachingcourse,
  onCancel = () => {}
) => {
  let token = getToken();
  let dataJson = JSON.stringify({
    ID: id,
    Role: role,
    Avatar: avatar,
    Name: name,
    Phone: phone,
    Email: email,
    Aboutme: aboutme,
    Position: position,
    Title: title,
    Department: department,
    Education: education,
    Office: office,
    Major: major,
    Language: language,
    Research: research,
    Supervision: supervision,
    Publication: publication,
    TeachingCourse: teachingcourse,
  });
  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/user/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "UPDATE_SUCCESSFUL") {
    onCancel();
    return res;
  } else {
    return null;
  }
};

export const UserUpdateStatus = async (id) => {
  let token = getToken();
  let dataJson = JSON.stringify({
    ID: id,
  });

  let res = await fetch(
    `https://bndhqt.phuckhangnet.vn/api/user/update-status`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: dataJson,
    }
  );
  res = await res.json();
  if (res.statuscode == 200 && res.message == "UPDATE_SUCCESSFUL") {
    return res;
  } else {
    return null;
  }
};

export const UserChangePassword = async (
  username,
  oldpassword,
  newpassword,
  onCancel = () => {}
) => {
  let token = getToken();
  let dataJson = JSON.stringify({
    Username: username,
    OldPassword: oldpassword,
    NewPassword: newpassword,
  });

  let res = await fetch(
    `https://bndhqt.phuckhangnet.vn/api/user/change_password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: dataJson,
    }
  );
  res = await res.json();
  if (res.statuscode == 200 && res.message == "CHANGE_PASSWORD_SUCCESSFUL") {
    onCancel();
    return res;
  } else {
    return null;
  }
};

export const UserResetPassword = async (username) => {
  let token = getToken();
  let dataJson = JSON.stringify({
    Username: username,
  });

  let res = await fetch(
    `https://bndhqt.phuckhangnet.vn/api/user/reset_password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: dataJson,
    }
  );
  res = await res.json();
  if (res.statuscode == 200 && res.message == "RESET_PASSWORD_SUCCESSFUL") {
    return res;
  } else {
    return null;
  }
};

export const getStaffList = async () => {
  let token = getToken();
  let dataJson = JSON.stringify({
    Type: "GET_ALL",
    Data: [],
  });

  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/user/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "GET_SUCCESSFUL") {
    return res;
  } else {
    return null;
  }
};

// ROLE
export const getRoleList = async () => {
  let token = getToken();
  let dataJson = JSON.stringify({
    Type: "",
    Data: [],
  });

  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/role/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "GET_SUCCESSFUL") {
    return res;
  } else {
    return null;
  }
};

// MENU
export const getMenuList = async () => {
  let token = getToken();
  let dataJson = JSON.stringify({
    Type: "GET_ALL",
    Data: [],
  });

  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/menu/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "GET_SUCCESSFUL") {
    return res;
  } else {
    return null;
  }
};

export const getMenuListByRole = async (role) => {
  let token = getToken();
  let dataJson = JSON.stringify({
    Type: "GET_BY_ROLE",
    Data: [],
    Role: role,
  });

  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/menu/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "GET_SUCCESSFUL") {
    return res;
  } else {
    return null;
  }
};

// ARTICLE
export const GetArticle = async (menuspage, userRole) => {
  let token = getToken();
  let dataJson = JSON.stringify({});
  if (userRole?.startsWith("LE")) {
    dataJson = JSON.stringify({
      Type: "GET_ALL_FROM_USER",
      Data: [],
      NoOfResult: 0,
      MenuID: menuspage,
      CurrentRole: userRole,
    });
  } else {
    dataJson = JSON.stringify({
      Type: "GET_ALL",
      Data: [],
      NoOfResult: 0,
      MenuID: menuspage,
      CurrentRole: userRole,
    });
  }

  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/article/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "GET_SUCCESSFUL") {
    return res;
  } else {
    return null;
  }
};

export const AddArticle = async (
  avatar,
  title,
  summary,
  hastag,
  menu,
  language,
  article_content,
  onCancel = () => {}
) => {
  let token = getToken();
  let dataJson = JSON.stringify({
    Avatar: avatar,
    Title: title,
    Summary: summary,
    Hastag: hastag,
    Menu: menu,
    Language: language,
    ArticleContent: article_content,
  });
  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/article/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "ADD_SUCCESSFUL") {
    onCancel();
    return res;
  } else {
    return null;
  }
};

export const UpdateArticle = async (
  id,
  title,
  articlecontent,
  hastag,
  menu,
  avatar,
  language,
  summary,
  onCancel = () => {}
) => {
  let token = getToken();
  let dataJson = JSON.stringify({
    ID: id,
    Title: title,
    Article_Content: articlecontent,
    Hastag: hastag,
    Menu: menu,
    Avatar: avatar,
    Language: language,
    Summary: summary,
  });
  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/article/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  console.log(res, "rs");
  if (res.statuscode == 200 && res.message == "UPDATE_SUCCESSFUL") {
    onCancel();
    return res;
  } else {
    return null;
  }
};

export const DeleteArticle = async (id) => {
  let token = getToken();
  let dataJson = JSON.stringify({
    ID: id,
  });
  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/article/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "DELETE_SUCCESSFUL") {
    return res.message;
  } else {
    return res.message;
  }
};

//BLOG
export const GetBlog = async () => {
  let token = getToken();
  let dataJson = JSON.stringify({
    Type: "GET_ALL",
    Data: [],
    NoOfResult: 0,
  });
  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/Blog/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "GET_SUCCESSFUL") {
    return res;
  } else {
    return null;
  }
};

export const AddBlog = async (
  title,
  article_content,
  hastag,
  language,
  onCancel = () => {}
) => {
  let token = getToken();
  let dataJson = JSON.stringify({
    Title: title,
    ArticleContent: article_content,
    Hastag: hastag,
    Language: language,
  });
  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/Blog/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "ADD_SUCCESSFUL") {
    onCancel();
    return res;
  } else {
    return null;
  }
};

export const UpdateBlog = async (
  id,
  title,
  articlecontent,
  hastag,
  language,
  onCancel = () => {}
) => {
  let token = getToken();
  let dataJson = JSON.stringify({
    ID: id,
    Title: title,
    Article_Content: articlecontent,
    Hastag: hastag,
    Language: language,
  });
  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/Blog/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "UPDATE_SUCCESSFUL") {
    onCancel();
    return res;
  } else {
    return null;
  }
};

export const DeleteBlog = async (id) => {
  let token = getToken();
  let dataJson = JSON.stringify({
    ID: id,
  });
  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/Blog/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "DELETE_SUCCESSFUL") {
    return res.message;
  } else {
    return res.message;
  }
};

// UPLOAD
export const UploadFile = async (formData) => {
  let res = await fetch(
    `https://bndhqt.phuckhangnet.vn/api/upload/verify_upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  res = await res.json();
  if (res) {
    return res;
  } else {
    return null;
  }
};

//WAREHOUSE
export const GetWarehouseFile = async () => {
  let token = getToken();
  let dataJson = JSON.stringify({
    Type: "GET_ALL",
    Data: [],
  });
  let res = await fetch(
    `https://bndhqt.phuckhangnet.vn/api/warehousefile/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: dataJson,
    }
  );
  res = await res.json();
  if (res.statuscode == 200 && res.message == "GET_SUCCESSFUL") {
    return res;
  } else {
    return null;
  }
};

export const getPositionList = async () => {
  let token = getToken();
  let dataJson = JSON.stringify({
    Type: "GET_ALL",
    Data: [],
  });
  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/list/position`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "GET_SUCCESSFUL") {
    return res;
  } else {
    return null;
  }
};

export const getTitleList = async () => {
  let token = getToken();
  let dataJson = JSON.stringify({
    Type: "GET_ALL",
    Data: [],
  });
  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/list/title`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "GET_SUCCESSFUL") {
    return res;
  } else {
    return null;
  }
};

export const getDepartmentList = async () => {
  let token = getToken();
  let dataJson = JSON.stringify({
    Type: "GET_ALL",
    Data: [],
  });
  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/list/department`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "GET_SUCCESSFUL") {
    return res;
  } else {
    return null;
  }
};

export const createListItem = async (
  code,
  description,
  type,
  onCancel = () => {}
) => {
  let token = getToken();
  let dataJson = JSON.stringify({
    Code: code,
    Description: description,
    Type: type,
  });
  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/list/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "ADD_SUCCESSFUL") {
    onCancel();
    return res;
  } else {
    return null;
  }
};
export const updateListItem = async (
  code,
  description,
  type,
  onCancel = () => {}
) => {
  let token = getToken();
  let dataJson = JSON.stringify({
    Code: code,
    Description: description,
    Type: type,
  });
  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/list/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "UPDATE_SUCCESSFUL") {
    onCancel();
    return res;
  } else {
    return null;
  }
};
export const deleteListItem = async (code, type) => {
  let token = getToken();
  let dataJson = JSON.stringify({
    Code: code,
    Type: type,
  });
  let res = await fetch(`https://bndhqt.phuckhangnet.vn/api/list/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: dataJson,
  });
  res = await res.json();
  if (res.statuscode == 200 && res.message == "DELETE_SUCCESSFUL") {
    return res;
  } else {
    return null;
  }
};
