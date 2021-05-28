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
    [Route("api/comments")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        CommentRepository _repo;

        public CommentsController()
        {
            _repo = new CommentRepository();
        }

        [HttpGet]
        public IActionResult GetAllComments()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("assignment/{id}")]
        public IActionResult GetCommentByAssignment(int id)
        {
            var comment = _repo.GetCommentByAssignment(id);
            if (comment == null)
            {
                return NotFound("This comment id does not exist");
            }
            return Ok(comment);
        }

        [HttpPost]
        public IActionResult AddAssignment(Comment comment)
        {
            _repo.Add(comment);
            return Created($"api/comments/{comment.id}", comment);
        }

        [HttpDelete("{commentid}")]
        public IActionResult DeleteMessage(int commentid)
        {
            _repo.Remove(commentid);
            return Ok();
        }
    }
}
