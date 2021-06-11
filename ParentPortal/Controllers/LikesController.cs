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
    [Route("api/likes")]
    [ApiController]
    public class LikesController : ControllerBase
    {
        LikeRepository _repo;

        public LikesController()
        {
            _repo = new LikeRepository();
        }

        [HttpGet]
        public IActionResult GetAllLikes()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("assignment/{id}")]
        public IActionResult GetLikeByAssignment(int id)
        {
            var like = _repo.GetLikeByAssignment(id);
            if (like == null)
            {
                return NotFound("This user id does not exist");
            }
            return Ok(like);
        }

        [HttpGet("assignment/{assignmentid}/{userid}")]
        public IActionResult GetLikeByAssignmentAndUser(int assignmentid, int userid)
        {
            var like = _repo.GetLikeByAssignmentAndUser(assignmentid, userid);
            if (like == null)
            {
                return NotFound("This user id does not exist");
            }
            return Ok(like);
        }

        [HttpPost]
        public IActionResult AddAssignment(Like like)
        {
            _repo.Add(like);
            return Created($"api/assignments/{like.id}", like);
        }

        [HttpDelete("{likeid}")]
        public IActionResult DeleteMessage(int likeid)
        {
            _repo.Remove(likeid);
            return Ok();
        }
    }
}
