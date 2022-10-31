let localData = localStorage.getItem("listSP");

let dataProduct = localData ? JSON.parse(localData) : [];

render();
// const idSp = $("#inp-id").val();
// const nameSp = $("#inp-tenSP").val();
// const quantitySp = $("#inp-quantity").val();
// const priceSp = $("#inp-price").val();
// const dateSp = $("#inp-date").val();

function validate(idSp, nameSp, quantitySp, priceSp, dateSp) {
  if (
    idSp.length < 1 ||
    nameSp.length < 1 ||
    quantitySp.length < 1 ||
    priceSp.length < 1 ||
    dateSp.length < 1
  ) {
    alert("vui long nhap day du thong tin");
    return false;
  } else if (idSp.length < 2 || idSp < 0) {
    $(".text-warn-id").removeClass("hidden");
    return false;
  } else if (nameSp.length < 6) {
    $(".text-warn-name").removeClass("hidden");
    return false;
  } else if (quantitySp.length < 2 || quantitySp < 0) {
    $(".text-warn-quantity").removeClass("hidden");
    return false;
  } else if (priceSp.length < 2 || priceSp < 0) {
    $(".text-warn-price").removeClass("hidden");
    return false;
  } else if (dateSp.length < 8) {
    $(".text-warn-date").removeClass("hidden");
    return false;
  }
  $(".text").remove();
  return true;
}

function add() {
  // $(".data-row").css("display", "block");
  let check = false;
  const idSp = $("#inp-id").val().trim();
  const nameSp = $("#inp-tenSP").val().trim();
  const quantitySp = $("#inp-quantity").val().trim();
  const priceSp = $("#inp-price").val().trim();
  const dateSp = $("#inp-date").val().trim();

  const itemProduct = {
    id: idSp,
    name: nameSp,
    quantity: quantitySp,
    price: priceSp,
    date: dateSp,
  };

  let valitdateCheck = validate(idSp, nameSp, quantitySp, priceSp, dateSp);

  dataProduct.forEach((element) => {
    if (element.id == idSp) {
      check = true;
    }
  });

  if (valitdateCheck) {
    if (check) {
      alert("id da ton tai");
    } else {
      dataProduct.push(itemProduct);
      render();
      localStorage.setItem("listSP", JSON.stringify(dataProduct));
      console.log(dataProduct);
    }
  }
}

function render() {
  let table = `

   <tr>
   <td>ID</td>
   <td>Tên SP</td>
   <td>SỐ lượng</td>
   <td>Giá tiền</td>
   <td>Ngày tháng</td>
   <td>action</td>
</tr>
  
  `;

  if (dataProduct.length == 0) {
    table += `
    <tr>

       <td colspan = "6" >chua co san pham</td>
    </tr>`;
  } else {
    dataProduct.forEach((element) => {
      table += `

      <tr class="data-row">
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.quantity}</td>
        <td>${element.price}</td>
        <td>${element.date}</td>
        <td>
          <button onClick="openEditModal('${element.id}')">
          <i class="fa-solid fa-wrench"></i>
          </button>
          <button onClick ="openDeleteModal('${element.id}')">
          <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>`;
    });
  }
  // $("#task-table").html(table);
  document.querySelector("#task-table").innerHTML = table;
}

function openDeleteModal(id) {
  const task = dataProduct.find((Element) => {
    return Element.id == id;
  });

  $(".modal-title").html(task.id);
  $(".modal-body").html("ban co chac muon xoa ko?");
  $("#open-delete").modal("show");

  $("#btn-delete").click(function (e) {
    dataProduct.forEach((item, index) => {
      if (item.id == id) {
        dataProduct.splice(index, 1);
        render();
        localStorage.setItem("listSP", JSON.stringify(dataProduct));
      }
    });
    $("#open-delete").modal("hide");
  });
  $("#btn-delete-off").click(function () {
    $("#open-delete").modal("hide");
  });
  $(".close").click(function () {
    $("#open-delete").modal("hide");
  });
}

function openEditModal(id) {
  const taskEdit = dataProduct.find((element) => {
    return element.id == id;
  });
  $(".modal-title-edit").html(taskEdit.id);
  $(".modal-body-edit").html(
    `
    <label>Name</label>
    <input type="text" class="inpEditNameSp" value="${taskEdit.name}"/>
    <label>Quantity</label>
    <input type="text" class="inpEditQuantitySp" value="${taskEdit.quantity}"/>
    <label>Price</label>
    <input type="text" class="inpEditPriceSp" value="${taskEdit.price}"/>
    <label>Date</label>
    <input type="date" class="inpEditDateSp" value="${taskEdit.date}"/>
    `
  );
  $("#open-edit").modal("show");
}

function editModal() {
  $("#btn-edit").click(function () {
    let idFix = $(".modal-title-edit").html();
    let taskFix = dataProduct.find((element) => {
      return element.id == idFix;
    });

    let editInputNameSp = $(".inpEditNameSp").val();
    let editInputQuantitySp = $(".inpEditQuantitySp").val();
    let editInputPriceSp = $(".inpEditPriceSp").val();
    let editInputDateSp = $(".inpEditDateSp").val();

    taskFix.name = editInputNameSp;
    taskFix.quantity = editInputQuantitySp;
    taskFix.price = editInputPriceSp;
    taskFix.date = editInputDateSp;

    console.log(dataProduct);
    localStorage.setItem("listSP", JSON.stringify(dataProduct));

    render();
    $("#open-edit").modal("hide");
  });
  $("#btn-edit-off").click(function () {
    $("#open-edit").modal("hide");
  });
  $(".close").click(function () {
    $("#open-edit").modal("hide");
  });
}

editModal();

// $(".text-bg-primary").click(function () {
//   countQuantity++;
//   if (countQuantity % 2 == 1) {
//     dataProduct.sort((a, b) => {
//       if (a.quantity > b.quantity) {
//         return -1000;
//       }
//     });
//     render();
//   }
//   if (countQuantity % 2 == 0) {
//     dataProduct.sort((a, b) => {
//       if (a.quantity < b.quantity) {
//         return -1000;
//       }
//     });
//     render();
//   }
//   console.log(221, countQuantity);
//   console.log(dataProduct);

//   localStorage.setItem("listSP", JSON.stringify(dataProduct));
// });

// console.log(227, countQuantity);

function appendButtonQuantity() {
  console.log($(this));
  $(this).parent().append(`
  <button class = "btn-quantity-tang" onClick="sortQuantityTang()">tang</button>
  <button class = "btn-quantity-giam" onClick="sortQuantityGiam()">giam</button>`);
}

$(".text-bg-primary").click(appendButtonQuantity);

function sortQuantityTang() {
  console.log(1);
  dataProduct.sort((a, b) => {
    if (a.quantity < b.quantity) {
      return -1000;
    }
  });
  $(".btn-quantity-giam").show();
  $(".btn-quantity-tang").hide();
  // $(".btn-quantity-tang").toggle();
  render();
  localStorage.setItem("listSP", JSON.stringify(dataProduct));
}
function sortQuantityGiam() {
  dataProduct.sort((a, b) => {
    if (a.quantity > b.quantity) {
      return -1000;
    }
  });
  $(".btn-quantity-giam").hide();
  $(".btn-quantity-tang").show();

  render();
  localStorage.setItem("listSP", JSON.stringify(dataProduct));
}
function appendButtondate() {
  $(this).parent().append(`
  <button class = "btn-date-tang" onClick="sortdateTang()">tang</button>
  <button class = "btn-date-giam" onClick="sortdateGiam()">giam</button>`);
}

$(".text-bg-secondary").click(appendButtondate);

function sortdateTang() {
  dataProduct.sort((a, b) => {
    if (a.date < b.date) {
      return -1000;
    }
  });
  $(".btn-date-tang").hide();
  $(".btn-date-giam").show();
  render();
  localStorage.setItem("listSP", JSON.stringify(dataProduct));
}
function sortdateGiam() {
  dataProduct.sort((a, b) => {
    if (a.date > b.date) {
      return -1000;
    }
  });
  $(".btn-date-tang").show();
  $(".btn-date-giam").hide();
  render();
  localStorage.setItem("listSP", JSON.stringify(dataProduct));
}
function appendButtonname() {
  $(this).parent().append(`
  <button class = "btn-name-tang" onClick="sortnameTang()">tang</button>
  <button class = "btn-name-giam" onClick="sortnameGiam()">giam</button>`);
}

$(".text-bg-success").click(appendButtonname);

function sortnameTang() {
  dataProduct.sort((a, b) => {
    if (a.name < b.name) {
      return -1000;
    }
  });
  $(".btn-name-tang").hide();
  $(".btn-name-giam").show();
  render();
  localStorage.setItem("listSP", JSON.stringify(dataProduct));
}
function sortnameGiam() {
  dataProduct.sort((a, b) => {
    if (a.name > b.name) {
      return -1000;
    }
  });
  $(".btn-name-tang").show();
  $(".btn-name-giam").hide();
  render();
  localStorage.setItem("listSP", JSON.stringify(dataProduct));
}

$(".text-bg-danger").click(function () {
  let indexWarning = [];

  dataProduct.filter((value, index) => {
    if (value.quantity > 5) {
      indexWarning.push(index);
    }
  });

  console.log(333, indexWarning);

  for (let i = 0; i < indexWarning.length; i++) {
    $(".data-row").eq(indexWarning[i]).css("display", "none");
  }
});

$(".text-bg-warning").click(function () {
  let indexFind = [];
  const findvalue = $(".find").val();

  dataProduct.filter((value, index) => {
    console.log(value.name);
    if (!value.name.toUpperCase().includes(findvalue.toUpperCase())) {
      indexFind.push(index);
    }
  });
  for (let i = 0; i < indexFind.length; i++) {
    $(".data-row").eq(indexFind[i]).css("display", "none");
  }
});
