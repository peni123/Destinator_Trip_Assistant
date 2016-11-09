<?php
class DB
{
    /**
     * @var PDO $connection
     */
    protected static $connection;

    public static function getConnection()
    {
        if (!self::$connection) {
  //DB_DSN, DB_USER, DB_PASS
            self::$connection = new PDO(DB_DSN, DB_USER, DB_PASS);
        }

        return self::connection;
    }

    public static function query($sql, $params) {
        $sth =self::getConnection()->prepare($sql);
        $sth->execute($params);
    }
}

DB::query('SELECT * FROM dblogin WHERE id= ?', [1]);
/* DB::query('SELECT * FROM quotesbook WHERE id= ?', [1]) */;