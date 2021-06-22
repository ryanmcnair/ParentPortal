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
    [Route("api/messagecomments")]
    [ApiController]
    public class MessageCommentsController : ControllerBase
    {
        MessageCommentRepository _repo;

        public MessageCommentsController()
        {
            _repo = new MessageCommentRepository();
        }

        [HttpGet("message/{id}")]
        public IActionResult GetCommentByMessage(int id)
        {
            var comment = _repo.GetCommentByMessage(id);
            if (comment == null)
            {
                return NotFound("This comment id does not exist");
            }
            return Ok(comment);
        }

        [HttpPost]
        public IActionResult AddComment(MessageCommentAdd comment)
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
