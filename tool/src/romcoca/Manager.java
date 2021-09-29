package romcoca;

import java.util.HashMap;

public class Manager {
    int post;
    private String host;
    private String mysql_host;
    private String mysql_database;
    private String mysql_user;
    private String mysql_pass;

    public Manager() {
        this.loadConfigFile();
        this.loadDataBase();
    }

    private void loadConfigFile() {
        byte[] ab = ServerSrc.loadFile("config.conf").toByteArray();
        if (ab == null) {
            System.out.println("Config file not found!");
            System.exit(0);
        }
        String data = new String(ab);
        HashMap<String, String> configMap = new HashMap<>();
        StringBuilder sbd = new StringBuilder();
        boolean bo = false;
        for (int i = 0; i <= data.length(); i++) {
            char es;
            if ((i == data.length()) || ((es = data.charAt(i)) == '\n')) {
                bo = false;
                String sbf = sbd.toString().trim();
                if (sbf != null && !sbf.equals("") && sbf.charAt(0) != '#') {
                    int j = sbf.indexOf(':');
                    if (j > 0) {
                        String key = sbf.substring(0, j).trim();
                        String value = sbf.substring(j + 1).trim();
                        configMap.put(key, value);
                        System.out.println("config: " + key + "-" + value);
                    }
                }
                sbd.setLength(0);
                continue;
            }
            if (es == '#') {
                bo = true;
            }
            if (!bo) {
                sbd.append(es);
            }
        }
        if (configMap.containsKey("host")) {
            host = configMap.get("host");
        } else {
            host = "localhost";
        }
        if (configMap.containsKey("mysql-host")) {
            mysql_host = configMap.get("mysql-host");
        } else {
            mysql_host = "localhost";
        }
        if (configMap.containsKey("mysql-user")) {
            mysql_user = configMap.get("mysql-user");
        } else {
            mysql_user = "root";
        }
        if (configMap.containsKey("mysql-password")) {
            mysql_pass = configMap.get("mysql-password");
        } else {
            mysql_pass = "";
        }
        if (configMap.containsKey("mysql-database")) {
            mysql_database = configMap.get("mysql-database");
        } else {
            mysql_database = "ninja";
        }
    }

    private void loadDataBase() {
        SQLManager.create(mysql_host, mysql_database, mysql_user, mysql_pass);
    }
}
