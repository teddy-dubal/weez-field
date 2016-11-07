var WeezFieldEngine = (function ($) {

    var _debug = true;
    var initTable = function () {
        $('#table').dragtable();
    };
    var initManageField = function () {
        $('#field_list input').change(function () {
            if ($(this).is(":checked")) {
                console.info('oui');
//                var returnVal = confirm("Are you sure?");
//                $(this).attr("checked", returnVal);
                var c = $("#table tr:first th").length;
                $("#table tr:first").append("<th><a href=''>Delete</a> Col " + (c + 1) + "</th>");
                $("#table tr:gt(0)").append("<td>Col</td>");
            } else {
                console.info('non');

            }
        });
    };
    /**
     *
     * @returns {undefined}
     */
    var init = function () {
        initTable();
        initManageField();
    };
    return {
        init: init
    };
})(jQuery);
/**
 *
 * @param {type} param
 */
jQuery(document).ready(function () {
    WeezFieldEngine.init();
});


