public class Enemy {
    private String name;
  
    private Integer health;
    private Integer damages;
    public Enemy(String name, Integer health, Integer damages) {
        this.name = name;
    
        this.health = health;
        this.damages = damages;


    }
    public String getName() {
        return name;
    }
    
    public Integer getHealth() {
        return health;
    }
    public Integer getDamages() {
        return damages;
    }
    
    public Integer setHealth(Integer newHealth) {
        return health = newHealth;
    }


}
