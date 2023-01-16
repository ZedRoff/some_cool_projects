public class Card {
    private Integer damages;
    private String name;
    private Integer health;

    public Card(String name, Integer health, Integer damages) {
        this.damages = damages;
        this.name = name;
        this.health = health;

    }
    public Integer getDamages() {
        return damages;
    }
    public String getName() {
        return name;
    }
    public Integer getHealth() {
        return health;
    }
  
    


}
