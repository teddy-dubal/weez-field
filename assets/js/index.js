var WeezFieldEngine = (function ($) {

    var _debug = true;
    var initTable = function () {
        var $table = $('#table');
        var initData = $('#add_tpl').data('default_tpl');
        Marray.fromObject($table, initData);
        $table.dragtable().dragtable('destroy').dragtable();
    };
    var initManageField = function () {
        $('#field_list input').change(function () {
            var $elt = $(this);
            var $table = $('#table');
            if ($elt.is(":checked")) {
                Marray.addColumn($table, {id: $elt.attr('id'), header: $elt.data('header'), headerCode: $elt.attr('name'), headerLip: $elt.data('lip')});
                $table.dragtable('destroy').dragtable();
            } else {
                Marray.removeColumn($table, $elt.attr('id'));
            }
        });
    };
    var initButton = function () {
        var ajaxObj = {
            type: "POST",
            data: {}
        };
        $('#add_tpl').on('click', function (e) {
            e.preventDefault();
            $('#field_list input').prop("checked", false);
            initTable();
        });
        $('#list_tpl').on('change', function (e) {
            var ts = (new Date()).getTime();
            var url = '/data/perso/' + $(this).val() + '?t=' + ts;
            $.getJSON(url, function (data) {
                var $table = $('#table');
                Marray.fromObject($table, data);
            });
        });
        $("#save_tpl").click(function () {
            var $table = $('#table');
            ajaxObj.url = 'ajax/save.php';
            ajaxObj.data.json = Marray.toJson($table);
            $.ajax(ajaxObj).done(function (msg) {
                console.info("Data Saved: ");
            });
        });
    };
    /**
     *
     * @returns {undefined}
     */
    var init = function () {
        initTable();
        initManageField();
        initButton();
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

var Marray = (function ($) {

    var defaultColumnOptions = {
        id: (new Date()).getTime(),
        header: 'Col',
        headerCode: '_hc_',
        headerLip: '_lip_'
    },
    prefixCol = 'c_',
            prefixRow = 'r_',
            prefixLip = 'r_';
    var removeColumn = function ($elt, id) {
        $elt.find('tr:first th').each(function (index, item) {
            if ($(item).attr('id') == prefixCol + id) {
                var col = index + 1;
                $('tr td:nth-child(' + col + '), tr th:nth-child(' + col + ')', $elt).remove();
            }
        });
        return this;
    };
    var addColumn = function ($elt, options) {
        defaultColumnOptions.id++;
        options = $.extend({}, defaultColumnOptions, options);
        $elt.find('tr:first').append('<th class="h" data-id="' + options.id + '" id="' + prefixCol + options.id + '">' + options.header + '</th>');
        $elt.find('tr:eq(1)').append('<td class="r" data-id="' + options.id + '" id="' + prefixRow + options.id + '">' + options.headerCode + '</td>');
        $elt.find('tr:eq(2)').append('<td class="l" data-id="' + options.id + '" id="' + prefixLip + options.id + '">' + options.headerLip + '</td>');
        return this;
    };
    var toJson = function ($elt) {
        var result = [];
        var header = $elt.find('.h');
        $.each(header, function (id, elt) {
            var $_elt = $(elt);
            var id = $_elt.data('id');
            var label = $_elt.html();
            var lip = $('#' + prefixLip + id).html();
            result.push({id: id, label: label, lip: lip});
        });
        return JSON.stringify(result);
    };
    var fromObject = function ($elt, obj) {
        $elt.find('tr').empty();
        var self = this;
        $.each(obj, function (id, val) {
            self.addColumn($elt, {id: val.id, header: val.label, headerCode: val.id, headerLip: val.lip});
        });
        return this;
    };
    return {
        addColumn: addColumn,
        removeColumn: removeColumn,
        toJson: toJson,
        fromObject: fromObject,
    };
})(jQuery);