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

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var announcement = _repo.Get(id);
            if (announcement == null)
            {
                return NotFound("This user id does not exist");
            }
            return Ok(announcement);
        }

        [HttpPost]
        public IActionResult AddAUser(Announcement announcement)
        {
            _repo.Add(announcement);
            return Created($"api/announcements/{announcement.id}", announcement);
        }

        [HttpDelete("{announcementid}")]
        public IActionResult DeleteMessage(int announcementid)
        {
            _repo.Remove(announcementid);
            return Ok();
        }

        [HttpPatch("{id}/update")]
        public IActionResult UpdateUser(int id, Announcement announcementObj)
        {
            var announcement = _repo.Get(id);

            announcement.publisher_id = announcementObj.publisher_id;
            announcement.pdf_url = announcementObj.pdf_url;
            announcement.text = announcementObj.text;
            announcement.staff_only = announcementObj.staff_only;

            _repo.Update(announcement);
            return NoContent();
        }
    }
}
