let updateRow;
$(document).on('submit', 'form', function (e) {
    e.preventDefault();
    let form = $(this);

    let data = new FormData($(this)[0]);


    let type = $(this).attr('method');

    let url = $(this).attr('action');


    $.ajax({
        url,
        type,
        data,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (res) {

            res.swal && Swal.fire(res.swal);
            res.formReset && (form.trigger("reset"));
            res.modalHide && $(res.modalHide).modal('hide');


            switch (res.addRowTable) {
                case '#user-data tbody':
                    userRow(res.user, res.addRowTable)
                    break;
            }

            switch (res.updateRowTable) {
                case "#user-data tbody":
                    userRowUpdate(res.user, res.updateRowTable)
                    break;
            }
        },
        error: function () {
            console.log('ERROR IN  AJAX');


        }
    })
});

function userRow(user, table) {
    let row = `<tr id='row-${user.id}'><td>${user.id}</td><td>${user.name}</td><td>${user.mobile}</td><td>${user.email}</td>
                            <td>
          <i data-url = "user?id=${user.id}" class="fa-solid fa-trash delete-btn text-danger"></i>
          <i data-url = "user?id=${user.id}" class="fa-solid fa-user-pen edit text-success"></i>
          </td>`;
    $(table).append(row);
}

function userRowUpdate(user, table) {
    let row = `<td>${user.id}</td><td>${user.name}</td><td>${user.mobile}</td><td>${user.email}</td>
                        <td>
          <i data-url = "user?id=${user.id}" class="fa-solid fa-trash delete-btn text-danger"></i>
          <i data-url = "user?id=${user.id}" class="fa-solid fa-user-pen edit text-success"></i>
          </td>`;

    // $(updateRow).parents('tr').html(row);
    $(`${table} #row-${user.id}`).html(row);
    // console.log(table + ' #row-' + user.id);
    $(table + ' #row-' + user.id).html(row);
}

$(document).on('click', '.delete-btn', function () {
    let row = $(this);
    let url = "/api/delete/" + $(this).data('url');


    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url,
                dataType: 'json',
                success: function (res) {
                    res.swal && Swal.fire(res.swal);
                    res.deleteRowTable && (row.parents('tr').remove());

                }


            })

            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
});


$(document).on('click', '.edit', function () {
    updateRow = $(this);


    let url = '/api/read/' + $(this).data('url');///api/read/user/id=23456

    $.ajax({
        url,
        dataType: 'json',
        success: function (res) {

            if (res.modalShow) {
                for (let [key, value] of Object.entries(res.formFieldValues)) {
                    $(`[name="${key}"]`).val(value);


                }


                $(res.modalShow).find('.modal-title span').text('Update')
                $(res.modalShow).modal('show');
                $(res.modalShow).find('form').attr('action', '/api/update/' + res.updateUrl);//  "/api/update/user=123"
            }


        },
        error: function () {
            console.log('error in ajax');
        }
    })
})


$(document).on('click', '.create-modal', function () {
    let target = $(this).data('bs-target')
    let formAction = '/api/create/' + $(this).data('url');
    $(target).find('.modal-title span').text('Create');
    $(target).find('form').attr('action', formAction);
    $(target + ' input').val('');
});


$(document).on('submit', '#search-user', function (e) {
    e.preventDefault();

    let data = new FormData($(this)[0]);



    let type = $(this).attr('method');

    let url = $(this).attr('action');



    $.ajax({
        url,
        type,
        data,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (res) {


            res.swal && Swal.fire(res.swal)


            switch (res.addRowTable) {
                case '#user-data tbody':
                    searchUserRow(res.user, res.addRowTable)
                    break;
            }


        },
        error: function () {
            console.log('ERROR that AJAX');


        }
    })
});

function searchUserRow(user, table) {
    let row = '';
    user.forEach(function (user) {
        row += `<tr id='row-${user.id}'><td>${user.id}</td><td>${user.name}</td><td>${user.mobile}</td><td>${user.email}</td>

          <td>
          <i data-url = "user?id=${user.id}" class="fa-solid fa-trash delete-btn text-danger"></i>
          <i data-url = "user?id=${user.id}" class="fa-solid fa-user-pen edit text-success"></i>
          </td>
          </tr>`
    });
    $(table).html(row);
}

$(document).on('submit', '.signUp', function (e) {
    e.preventDefault();
    let url = $(this).attr('action');
    let type = $(this).attr('method');
    let data = new FormData($(this)[0]);
    let form = $(this)
    $.ajax({
        url,
        type,
        data,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (res) {
            res.formReset && (form.trigger('reset'))
            res.swal && Swal.fire(res.swal);
            // setTimeout(() => {
            //     window.location.href = '/users'; // Redirect to the new page
            // }, 2000);

        },
        error: function () {
            console.log('ERROR IN AJAX');

        }
    })

})

$(document).on('submit', '.log-in', function (e) {
    e.preventDefault();
    let url = $(this).attr('action')
    let type = $(this).attr('method')
    let data = new FormData($(this)[0])

    let form = $(this)
    $.ajax({
        url,
        data,
        type,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (res) {
            console.log('kjsdkljsf', res);

        }

    })

})
