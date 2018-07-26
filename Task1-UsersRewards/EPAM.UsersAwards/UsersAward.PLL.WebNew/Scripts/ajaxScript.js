/// <reference path="jquery-1.10.1.intellisense.js" />

$(document).ready(function () {
    var table = $('table.table:eq(0)');

    $('.award').each(function (ind, value) {
        value.addEventListener('click', function () {
            $.ajax({
                url: '/ShowModalForAward/Ajax/',
                data: { awardId: value.dataset.id },
                success: function (response) {
                    table.after(response);

                    $('#awardModal').modal('show');
                    $('#awardModal').on('hidden.bs.modal', function (e) {
                        this.remove();
                    });
                },
                error: function (e) {
                    console.log(e);
                    alert(e);
                }
            });
        });
    });
});