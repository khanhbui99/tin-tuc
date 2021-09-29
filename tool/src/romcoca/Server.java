package romcoca;

import java.io.IOException;
import java.net.BindException;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {

    private static Server instance = null;
    public static boolean start = false;
    public Manager manager;

    public static void main(String[] args) {
        start = true;
        getInstance().run();
    }

    private void init() {
        manager = new Manager();
    }

    public static Server getInstance() {
        if (instance == null) {
            instance = new Server();
            instance.init();
        }
        return instance;
    }

    public void run() {
        Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("Shutdown Server!");
                stop();
            }
        }));
        while(start) {
            System.out.println("Crawling...");
            Crawl crawl = new Crawl();
            crawl.startCrawl();
        }
    }

    public void stop() {
        if (start) {
            manager = null;
            SQLManager.close();
            System.gc();
        }
    }

}
