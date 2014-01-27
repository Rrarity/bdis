/**
 * Created by user on 23.01.14.
 */

var ADMIN_BASE_URL = "admin/";

(function($) {
    $(document).ready(function(e) {
        $("#tab_strip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        var subdivision = $("#subdivision").kendoGrid({
            dataSource: {
                type: "json",
                transport: {
                    read: {
                        url: BASE_URL+ADMIN_BASE_URL+"subdivision/read/",
                        dataType: "json",
                        type: "POST"
                    },
                    destroy: {
                        url: BASE_URL+ADMIN_BASE_URL+"subdivision/destroy/",
                        dataType: "json",
                        type: "POST"
                    },
                    create: {
                        url: BASE_URL+ADMIN_BASE_URL+"subdivision/create/",
                        dataType: "json",
                        type: "POST"
                    },
                    update: {
                        url: BASE_URL+ADMIN_BASE_URL+"subdivision/update/",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function(options, operation) {
                        if (operation !== "read" && options) {
                            return {item: kendo.stringify(options)};
                        }
                    }
                },
                schema: {
                    model: {
                        id: "subdivision_id",
                        fields: { name: {
                                    validation: { required: { message: "Поле не может быть пустым" } }
                        }, tel: {} }
                    }
                }
            },
            toolbar:  [
                { template: kendo.template($("#subdivision_header_template").html()) }
            ],
            height: 430,
            sortable: true,
            editable: {
                mode: "inline",
                confirmation: "Вы уверены, что хотите удалить запись?",
                confirmDelete: "Да",
                cancelDelete: "Нет"
            },
//            pageable: {
//                pageSize: 20,
//                //pageSizes: true,
//                messages: {
//                    display: "{0}-{1} из {2} записей",
//                    empty: " ",
//                    previous: "Предыдущая страница",
//                    next: "Следующая страница",
//                    last: "Последняя страница",
//                    first: "Первая страница"
//                }
//            },
            detailTemplate: kendo.template($("#subdivision_detail_template").html()),
            detailInit: detailInit,
//            dataBound: function() {
//                this.expandRow(this.tbody.find("tr.k-master-row").first());
//            },
            columns: [
                { field: "name", title: "Название" },
                { field: "tel", title: "Телефон", width: "300px", attributes: {title: "#=tel#"} },
                { command: [
                    { name: "edit",
                        text: {
                            edit: "Редактировать",
                            update: "Сохранить",
                            cancel: "Отменить"
                        }
                    },
                    { name: "destroy", text: "Удалить" }
                ], width: "250px", attributes: { style: "text-align: center;"} }
            ]
        }).data("kendoGrid");

        $(".add_subdivision").click(function(e) {
            subdivision.addRow();
            return false;
        });

        var is_department_select = false;

        var authors = $("#authors").kendoGrid({
            dataSource: {
                type: "json",
                transport: {
                    read: {
                        url: BASE_URL+ADMIN_BASE_URL+"authors/read/",
                        dataType: "json",
                        type: "POST"
                    },
                    destroy: {
                        url: BASE_URL+ADMIN_BASE_URL+"authors/destroy/",
                        dataType: "json",
                        type: "POST"
                    },
                    create: {
                        url: BASE_URL+ADMIN_BASE_URL+"authors/create/",
                        dataType: "json",
                        type: "POST"
                    },
                    update: {
                        url: BASE_URL+ADMIN_BASE_URL+"authors/update/",
                        dataType: "json",
                        type: "POST"
                    },
                    parameterMap: function(options, operation) {
                        if (operation !== "read" && options) {
                            return {item: kendo.stringify(options)};
                        }
                    }
                },
                schema: {
                    model: {
                        id: "author_id",
                        fields: {
                            name: {
                                validation: {
                                    required: { message: "Поле не может быть пустым" }
                                }
                            },
                            surname: {},
                            patronymic: {},
                            tel: {},
                            post: {},
                            mail: {},
                            department: {}
                        }
                    }
                }
            },
            toolbar:  [
                { template: kendo.template($("#authors_header_template").html()) }
            ],
            height: 430,
            sortable: true,
            editable: {
                mode: "inline",
                confirmation: "Вы уверены, что хотите удалить запись?",
                confirmDelete: "Да",
                cancelDelete: "Нет"
            },
//            pageable: {
//                pageSize: 20,
//                //pageSizes: true,
//                messages: {
//                    display: "{0}-{1} из {2} записей",
//                    empty: " ",
//                    previous: "Предыдущая страница",
//                    next: "Следующая страница",
//                    last: "Последняя страница",
//                    first: "Первая страница"
//                }
//            },
//            detailTemplate: kendo.template($("#subdivision_detail_template").html()),
//            detailInit: detailInit,
//            dataBound: function() {
//                this.expandRow(this.tbody.find("tr.k-master-row").first());
//            },
            columns: [
                { field: "name", title: "ФИО", template: "#var fio=[surname,name,patronymic].join(' ');# #=fio#",
                    editor: function(container, options) {
                                $('<input required placeholder="Фамилия" data-bind="value: surname" class="k-textbox"/>')
                                    .css({margin: "3px 0px 1px"})
                                    .appendTo(container);
                                $('<input required placeholder="Имя" data-bind="value: name" class="k-textbox" />')
                                    .css({margin: "3px 0px 1px"})
                                    .appendTo(container);
                                $('<input data-bind="value: patronymic" placeholder="Отчество" class="k-textbox"/>')
                                    .css({margin: "3px 0px 1px"})
                                    .appendTo(container);
                            }},
                { field: "post", title: "Должность", width: "300px", attributes: {title: "#=post#"} },
                { field: "tel", title: "Телефон", width: "150px", attributes: {title: "#=tel#"} },
                { field: "mail", title: "Электронный адрес", width: "250px", attributes: {title: "#=mail#"} },
                { field: "department__name", title: "Подразделение", width: "200px", attributes: {title: ""},
                    editor: function(container, options) {
                        $('<input id="author_subdivision" data-text-field="name" data-value-field="subdivision_id" />')
                            .css({margin: "3px 0px 1px"})
                            .appendTo(container)
                            .kendoDropDownList({
                                optionLabel: "Выберите подразделение...",
                                dataSource: {
                                    type: "json",
                                    transport: {
                                        read: {
                                            url: BASE_URL + ADMIN_BASE_URL + "subdivision/read/",
                                            dataType: "json",
                                            type: "POST"
                                        }
                                    }
                                }
                            });
                        $('<input data-text-field="name" disabled="disabled" data-value-field="department_id" data-bind="value: department"/>')
                            .css({margin: "3px 0px 1px"})
                            .appendTo(container)
                            .kendoDropDownList({
                                optionLabel: "Выберите отдел...",
                                cascadeFrom: "author_subdivision",
                                cascadeFromField: "subdivision_id",
                                dataSource: {
                                    type: "json",
                                    transport: {
                                        read: {
                                            url: BASE_URL+ADMIN_BASE_URL+"department/read/",
                                            type: "POST",
                                            dataType: "json"
                                        }
                                    }
                                },
                                select: function(e) {
                                    console.log("before select ",is_department_select);
                                    var dataItem = this.dataItem(e.item.index());
                                    is_department_select = dataItem;
                                    console.log("after select ",is_department_select);
                                }
                            });
                    }
                },
                { command: [
                    { name: "edit",
                        text: {
                            edit: "Редактировать",
                            update: "Сохранить",
                            cancel: "Отменить"
                        }
                    },
                    { name: "destroy", text: "Удалить" }
                ], width: "250px", attributes: { style: "text-align: center;"} }
            ],
            save: function(e) {
                console.log("on save ",is_department_select, e.model);
                if (is_department_select) { //если изменили подразделние, меняем и название
                    if (is_department_select.department_id == e.model.department) {
                        e.model.department__name = is_department_select.name;
                        console.log("e model ",e.model);
                    }
                    is_department_select = false;
                }
            }
        }).data("kendoGrid");

        $(".add_author").click(function(e) {
            authors.addRow();
            return false;
        })

    });
})(jQuery);

function detailInit(e) {
    var detailRow = e.detailRow;
    var subdivision_id = e.data.subdivision_id;

    var department_dataSource = new kendo.data.DataSource({
        type: "json",
        transport: {
            read: {
                url: BASE_URL+ADMIN_BASE_URL+"department/read/",
                type: "POST",
                dataType: "json"
            },
            destroy:
            {
                url: BASE_URL+ADMIN_BASE_URL+"department/destroy/",
                dataType: "json",
                type: "POST"
            },
            create: {
                url: BASE_URL+ADMIN_BASE_URL+"department/create/",
                dataType: "json",
                type: "POST"
            },
            update: {
                url: BASE_URL+ADMIN_BASE_URL+"department/update/",
                dataType: "json",
                type: "POST"
            },
            parameterMap: function(options, operation) {
                if (operation == "read") {
                    return {subdivision_id: subdivision_id};
                }
                if (options) {
                    options.subdivision_id = subdivision_id;
                    return {item: kendo.stringify(options)};
                }
            }
        },
        schema: {
            model: {
                id: "department_id",
                fields: { name: {
                            validation: {
                                required: { message: "Поле не может быть пустым" }
                            }
                }, tel: {}, mail: {} }
            }
        },
        requestStart: function(e) {
//            console.log("request started",e);
        },
        requestEnd: function(e) {
//            console.log("request ended",e);
        }
    });

    var department = detailRow.find("#department").kendoGrid({
            dataSource: department_dataSource,
            height: 350,
            sortable: true,
            editable: {
                mode: "inline",
                confirmation: "Вы уверены, что хотите удалить запись?",
                confirmDelete: "Да",
                cancelDelete: "Нет"
            },
            pageable: {
                pageSize: 20,
                //pageSizes: true,
                messages: {
                    display: " ",
                    empty: " ",
                    previous: "Предыдущая страница",
                    next: "Следующая страница",
                    last: "Последняя страница",
                    first: "Первая страница"
                }
            },
        toolbar:  [
            { template: kendo.template($("#department_header_template").html()) }
        ],
        columns: [
                { field: "name", title: "Название" },
                { field: "tel", title: "Телефон", width: "300px" },
                { field: "mail", title: "Электронный адрес", width: "300px" },
                { command: [
                    { name: "edit",
                        text: {
                            edit: "Редактировать",
                            update: "Сохранить",
                            cancel: "Отменить"
                        }
                    },
                    { name: "destroy", text: "Удалить" }
                ], width: "250px", attributes: { style: "text-align: center;"} }
            ],
        save: function(e) {
            var new_name = e.model.name;
            var data = department_dataSource.data();
            var result;
            if (e.model.department_id != "") { ///возможно это редактирование
                result = $.grep(data,
                    function(o) {
                        if (o.department_id != e.model.department_id) {
                            return o.name.toUpperCase() == new_name.toUpperCase();
                        } else { //проверка, есть ли такие подразделения
                            return false;
                        }
                    }
                );
                if (result.length > 0) {
                    noty_error("Такой отдел уже добавлен");
                    e.preventDefault();
                }
            } else { //возможно это добавление, (id == "")
                result = $.grep(data,
                    function(o) {
                        if (o.department_id != "") {
                            return o.name.toUpperCase() == new_name.toUpperCase();
                        } else { //проверка, есть ли такие подразделения
                            return false;
                        }
                    }
                );
                if (result.length > 0) {
                    noty_error("Такой отдел уже добавлен");
                    e.preventDefault();
                }
            }
        }
    }).data("kendoGrid");

    detailRow.find(".add_department").click(function(e) {
        department.addRow();
        return false;
    });
}
