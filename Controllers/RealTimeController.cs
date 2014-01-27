namespace TestTask.Controllers
{
    using System;
    using System.Web.Mvc;
    using System.Web.SessionState;

    [SessionState(SessionStateBehavior.Disabled)]
    public class RealTimeController : Controller
    {
        [HttpGet]
        public JsonResult CurrentServerTime()
        {
            return Json(DateTime.UtcNow, JsonRequestBehavior.AllowGet);
        }
    }
}