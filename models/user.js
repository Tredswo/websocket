// CREATE TABLE `Users`{
//     `id` INT AUTO_INCREMENT PRIMARY KEY,
//     `username` VARCHAR(255) NOT NULL UNIQUE ,
//     `createdAt` DATETIME NOT NULL ,
//     `updatedAt` DATETIME NOT NULL ,
   
// }

// CREATE TABLE `Messages`{
//     `id` INT AUTO_INCREMENT PRIMARY KEY,
//     `text` VARCHAR(255) NOT NULL  ,
//     `createdAt` DATETIME NOT NULL ,
//     `updatedAt` DATETIME NOT NULL ,
//     `UserId` INT ,
//     FOREIGN KEY (`UserId`)REFERENCES `Users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
// }


module.exports=(sequelize,DataTypes)=>{
    return sequelize.define("User",{
        username:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
        },
    });
};

