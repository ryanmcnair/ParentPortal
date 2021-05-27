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
    [Route("api/messages")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        MessageRepository _repo;

        public MessagesController()
        {
            _repo = new MessageRepository();
        }

        [HttpGet]
        public IActionResult GetAllMessages()
        {
            return Ok(_repo.GetAll());
        }
    }
}
