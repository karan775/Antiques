namespace Antiques.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class dbinit : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Antiques",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CulteralOrigin = c.String(),
                        Manufacturer = c.String(),
                        Material = c.String(),
                        Condition = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Antiques");
        }
    }
}
