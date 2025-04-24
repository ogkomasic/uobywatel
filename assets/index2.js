// assets/index.js

var selector = document.querySelector(".selector_box");
selector.addEventListener('click', () => {
    selector.classList.toggle("selector_open");
});

document.querySelectorAll(".date_input").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown")
    });
});

let sex = "m";
document.querySelectorAll(".selector_option").forEach((option) => {
    option.addEventListener('click', () => {
        sex = option.id;
        document.querySelector(".selected_text").textContent = option.textContent;
    });
});

const upload = document.querySelector(".upload");
const imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif";

upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown");
});

imageInput.addEventListener('change', () => {
    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");
    upload.removeAttribute("selected");

    const file = imageInput.files[0];
    const data = new FormData();
    data.append("image", file);

    fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            'Authorization': 'Client-ID c8c28d402435402'
        },
        body: data
    })
    .then(result => result.json())
    .then(response => {
        const url = response.data.link;
        upload.setAttribute("selected", url);
        upload.querySelector(".upload_uploaded").src = url;
        upload.classList.remove("upload_loading");
        upload.classList.add("upload_loaded");
    });
});

function isEmpty(value) {
    return /^\s*$/.test(value);
}

document.querySelector(".go").addEventListener('click', () => {
    const empty = [];
    const params = new URLSearchParams();

    params.set("sex", sex);

    if (!upload.hasAttribute("selected")) {
        empty.push(upload);
        upload.classList.add("error_shown");
    } else {
        params.set("image", upload.getAttribute("selected"));
    }

    let birthday = "";
    let dateEmpty = false;
    document.querySelectorAll(".date_input").forEach((element) => {
        birthday += "." + element.value;
        if (isEmpty(element.value)) {
            dateEmpty = true;
        }
    });
    birthday = birthday.substring(1);

    if (dateEmpty) {
        const dateElement = document.querySelector(".date");
        dateElement.classList.add("error_shown");
        empty.push(dateElement);
    } else {
        params.set("birthday", birthday);
    }

    document.querySelectorAll(".input_holder").forEach((element) => {
        const input = element.querySelector(".input");
        if (isEmpty(input.value)) {
            empty.push(element);
            element.classList.add("error_shown");
        } else {
            params.set(input.id, input.value);
        }
    });

    if (empty.length === 0) {
        location.href = "id.html?" + params.toString();
    } else {
        empty[0].scrollIntoView();
    }
});

document.querySelector(".guide_holder").addEventListener('click', () => {
    document.querySelector(".guide_holder").classList.toggle("unfolded");
});
