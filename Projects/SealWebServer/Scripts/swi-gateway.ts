﻿declare var WebApplicationName: string;
var _sealServer: string = WebApplicationName;
var _errorServer: string = SWIUtil.tr("Error: Unable to connect to the server") + ": '" + _sealServer + "'"; 

function callbackHandler(data: any, callback: (data: any) => void, errorcb?: (data: any) => void) {
    if (!data.error) {
        if (callback) callback(data);
    }
    else {
        if (errorcb) errorcb(data);
        else {
            SWIUtil.ShowMessage("alert-danger", data.error, 0);
            if (!data.authenticated) {
                location.reload(true);
            }
        }
    }
}

function failure() {
    SWIUtil.ShowMessage("alert-danger", _errorServer, 0);
}

class SWIGateway {
    private _execForm: JQuery = null;
    private getExecForm(action : string): JQuery {
        if (this._execForm == null) this._execForm = $('<form method="post" target="_blank"/>').appendTo('body');
        this._execForm.find("input").remove();
        this._execForm.attr('action', _sealServer + action);
        return this._execForm;
    }

    public GetVersions(callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIGetVersions", { })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public Login(user: string, password: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWILogin", {
            user: user, password: password
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public Logout(callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWILogout")
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public GetUserProfile(callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIGetUserProfile")
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public GetCultures(callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIGetCultures")
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public SetUserProfile(culture: string, defaultView: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWISetUserProfile", {
            culture: culture,
            defaultView: defaultView
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public DeleteFiles(paths: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIDeleteFiles", {
            paths: paths
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public MoveFile(source: string, destination: string, copy : boolean, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIMoveFile", {
            source: source, destination: destination, copy: copy
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public GetRootFolders(callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIGetRootFolders", {
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public GetFolders(path: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIGetFolders", {
            path: path
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public GetFolderDetail(path: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIGetFolderDetail", {
            path: path
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public CreateFolder(path: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWICreateFolder", {
            path: path
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public DeleteFolder(path: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIDeleteFolder", {
            path: path
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public RenameFolder(source: string, destination : string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIRenameFolder", {
            source: source, destination: destination
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public Search(path: string, pattern: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWISearch", {
            path: path, pattern: pattern
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public ExecuteReport(path: string, render: boolean, viewGUID: string, outputGUID: string) {
        var f = this.getExecForm("SWExecuteReport");
        f.append($('<input />').attr('name', 'path').attr('value', path));
        f.append($('<input />').attr('name', 'render').attr('value', JSON.stringify(render)));
        f.append($('<input />').attr('name', 'viewGUID').attr('value', viewGUID));
        f.append($('<input />').attr('name', 'outputGUID').attr('value', outputGUID));
        f.children('input').attr('type', 'hidden');
        f.submit();
    }

    public ExecuteReportDefinition(report: any, render: boolean, viewGUID: string, outputGUID: string) {
        var f = this.getExecForm("SWExecuteReportDefinition");
        f.append($('<input />').attr('name', 'report').attr('value', report));
        f.append($('<input />').attr('name', 'render').attr('value', JSON.stringify(render)));
        f.append($('<input />').attr('name', 'viewGUID').attr('value', viewGUID));
        f.append($('<input />').attr('name', 'outputGUID').attr('value', outputGUID));
        f.children('input').attr('type', 'hidden');
        f.submit();
    }

    public ViewFile(path: string) {
        var f = this.getExecForm("SWViewFile");
        f.append($('<input />').attr('type', 'hidden').attr('name', 'path').attr('value', path));
        f.submit();
    }

    public GetReportDetail(path: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIGetReportDetail", {
            path: path
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public NewReportDefinition(path: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWINewReportDefinition", {
            path: path
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public GetReportDefinition(path: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIGetReportDefinition", {
            path: path
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public SaveReportDefinition(path: string, check: boolean, report: any, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWISaveReportDefinition", {
            path: path, check: check, report: report
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public GetUserDashboards(callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIGetUserDashboards")
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public GetDashboards(callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIGetDashboards")
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public GetDashboardItems(guid: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIGetDashboardItems", {
            guid: guid
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public GetDashboardItem(guid: string, itemguid: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIGetDashboardItem", {
            guid: guid,
            itemguid: itemguid
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public GetWidgets(callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIGetWidgets")
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public GetDashboardResult(guid: string, itemguid: string, force :boolean, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIGetDashboardResult", {
            guid: guid,
            itemguid: itemguid,
            force : force
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public AddDashboard(guids: string[], callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIAddDashboard", {
            guids: guids
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public RemoveDashboard(guid: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIRemoveDashboard", {
            guid: guid
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public CreateDashboard(name: string, path: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWICreateDashboard", {
            name: name,
            path: path
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public DeleteDashboard(guid: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIDeleteDashboard", {
            guid: guid
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public MoveDashboard(guid: string, name: string, path : string, copy: boolean, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIMoveDashboard", {
            guid: guid,
            name: name,
            path: path,
            copy: copy
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public AddDashboardItems(guid: string, widgetguids: string, title: string, order: number, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIAddDashboardItems", {
            guid: guid,
            widgetguids: widgetguids,
            title: title,
            order: order
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public SaveDashboardItem(guid: string, itemguid: string, name: string, groupname: string, color: string, icon: string, width: number, height: number, dynamic:boolean, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWISaveDashboardItem", {
            guid: guid,
            itemguid: itemguid,
            name: name,
            groupname: groupname,
            color: color,
            icon: icon,
            width: width,
            height: height,
            dynamic: dynamic
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public UpdateDashboardItemsGroupName(guid: string, oldname: string, newname: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIUpdateDashboardItemsGroupName", {
            guid: guid,
            oldname: oldname,
            newname: newname
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public DeleteDashboardItem(guid: string, itemguid: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWIDeleteDashboardItem", {
            guid: guid,
            itemguid: itemguid
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public SwapDashboardOrder(guid1: string, guid2: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWISwapDashboardOrder", {
            guid1: guid1,
            guid2: guid2
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public SwapDashboardGroupOrder(guid: string, source: number, destination: number, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWISwapDashboardGroupOrder", {
            guid: guid,
            source: source,
            destination: destination
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public SetLastDashboard(guid: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWISetLastDashboard", {
            guid: guid
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

    public SaveDashboardItemsOrder(guid: string, orders: string[], itemguid: string, groupname: string, callback: (data: any) => void, errorcb?: (data: any) => void) {
        $.post(_sealServer + "SWISaveDashboardItemsOrder", {
            guid: guid,
            orders: orders,
            itemguid: itemguid,
            groupname: groupname
        })
            .done(function (data) { callbackHandler(data, callback, errorcb); })
            .fail(function () { failure(); });
    }

}
