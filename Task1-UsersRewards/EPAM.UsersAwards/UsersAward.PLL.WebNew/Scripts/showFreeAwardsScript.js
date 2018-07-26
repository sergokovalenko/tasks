/// <reference path="jquery-1.10.1.intellisense.js" />

$('document').ready(function () {
    $('#addAward').on('click', function () {
        var id = this.dataset.id;

        $.ajax({
            url: '/ShowModalForFreeAward/Ajax/',
            data: { userId: id },
            success: function (response) {
                $('table.table:eq(0)').after(response);
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