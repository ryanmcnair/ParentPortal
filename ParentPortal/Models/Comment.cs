using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParentPortal.Models
{
    public class Comment
    {
        public int id { get; set; }
        public int assignment_id { get; set; }
        public int user_id { get; set; }
        public string comment { get; set; }
    }
}
