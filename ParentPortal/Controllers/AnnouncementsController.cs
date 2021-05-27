using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ParentPortal.DataAccess;
using ParentPortal.Models;

namespace ParentPortal.Controllers
{
    [Route("api/announcements")]
    [ApiController]
    public class AnnouncementsController : ControllerBase
    {
        AnnouncementRepository _repo;

        public AnnouncementsController()
        {
            _repo = new AnnouncementRepository();
        }

        [HttpGet]
        public IActionResult GetAllAnnouncements()
        {
            return Ok(_repo.GetAll());
        }
    }
}
