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
    }
}
