package romcoca;

public class News {
    private String title;
    private String imageURL;
    private String link;
    private String shortContent;

    public News(String title, String imageURL, String link, String shortContent) {
        this.title = title;
        this.imageURL = imageURL;
        this.link = link;
        this.shortContent = shortContent;
    }

    public String getTitle() {
        return this.title;
    }

    public String getImageURL() {
        return this.imageURL;
    }

    public String getLink() {
        return this.link;
    }

    public String getShortContent() {
        return this.shortContent;
    }
}
