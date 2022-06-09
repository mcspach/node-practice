const editButtons = document.querySelectorAll(".update");
const deleteButtons = document.querySelectorAll(".delete");
const saveButtons = document.querySelectorAll(".save");
const closeButtons = document.querySelectorAll(".close");

editButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // const updateId = event.target.getAttribute("id");
    const updateForm = event.target.closest("li").nextElementSibling;
    console.log(updateForm);

    updateForm.style.display = "block";
  });
});

saveButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const updateId = event.target.getAttribute("id");
    const updateForm = event.target.closest("form");
    console.log(updateForm);

    fetch("/quotes", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: updateId,
        name: updateForm.children[2].value,
        quote: updateForm.children[3].value
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((response) => {
        window.location.reload(true);
      });
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const updateForm = event.target.closest("form");
    console.log(updateForm);

    updateForm.style.display = "none";
  });
});

deleteButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const updateId = event.target.getAttribute("id");


    fetch("/quotes", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: updateId,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((response) => {
        window.location.reload();
      });
  });
});
