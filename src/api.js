var date = new Date()
export default {
        '2009000000IDRECO0AA6':{
        menuId:'2009000000IDRECO0AA6',
        url:'/i2connect/supplierClassTag/getClassTagsByParentTag',
        tableType:'LoadTable',
        viewName:'col_supplier_type_list',

    },
    '2009000000IDRECO0A39':{
        menuId:'2009000000IDRECO0A39',
        url:'/i2connect/supplierClass/getSupplierBySupplierClass',
        tableType:'Table',
        viewName:'col_company_list',

    },
    '2009000000IDRECO0A1B':{
        menuId:'2009000000IDRECO0A1B',
        url:'/i2connect/roles',
        tableType:'Table',
        viewName:'col_commonND_list',
    },
    '2009000000IDRECO0A1D':{
        menuId:'2009000000IDRECO0A1D',
        url:'/i2connect/users',
        tableType:'Table',
        viewName:'col_user_list',
    },
    '2009000000IDRECO0A1E':{
        menuId:'2009000000IDRECO0A1E',
        url:'/i2connect/corpPresetRole',
        tableType:'Table',
        viewName:'col_com_auth_list',
    },
    '2009000000IDRECO0AAV':{
        menuId:'2009000000IDRECO0AAV',
        url:'/i2connect/librarys',
        tableType:'Table',
        viewName: 'col_doc_lib_list',
        params : {
            objectTypeName: 'XOT_LIBTOP',
            _: date
        }
    },
    '2009000000IDRECO0AMC':{
        menuId:'2009000000IDRECO0AMC',
        url:'/i2connect/workHour/projects',
        tableType:'ObjTable',
        viewName:'col_project_list',
        formviewName:'from_project_search',
        drawer:{
            id: '2005000000IDRECOB275',
            url:'/i2connect/workHour/projects/',
            viewName:'form_project_edit'
        }
    },
    '2009000000IDRECO0AXU':{
        menuId:'2009000000IDRECO0AXU',
        url:'/i2connect/workHoursType',
        tableType:'ObjTable',
        viewName:'col_work_hours_type_list',
        formviewName:'form_work_hours_type_search',
        drawer:{
            id: '2005000000IDRECOB276',
            url:'/i2connect/workHoursType/',
            viewName:'form_work_hours_type_edit'
        }
    }
}