 $(function(){
            $('#dg').edatagrid({
                url: '../control/get_user.php',
                saveUrl: '../control/save_user.php',
                updateUrl: '../control/update_user.php',
                destroyUrl: '../control/delete_user.php'
            });
        });