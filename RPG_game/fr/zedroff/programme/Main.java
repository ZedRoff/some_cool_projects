

import java.util.HashMap;
import java.util.Random;
import java.util.Scanner;

import java.util.concurrent.TimeUnit;
public class Main {
    public static void main(String[] args) throws InterruptedException {
       
        
        try (Scanner user_entry = new Scanner(System.in)) {
            System.out.println("User name > ");
            String username = user_entry.nextLine();
            HashMap<String, String> card = new HashMap<String, String>();
            Player player = new Player(username, card);

            System.out.println(String.format("Welcome %s in this game, where you can collect Cards and battle against enemies.\n================================\n\nIn this game you can : ", player.getName()));

            
            for(Commands cmd: Commands.getCommands()) {
                System.out.println(String.format("\t- /%s : %s", cmd.toString().toLowerCase(), cmd.help_msg));
            }
   
      boolean running = true;
      while(running) {
                String command = user_entry.nextLine();
                String[] arr = command.split(" ");
                switch(arr[0]) {
                    case "/inventory":
                        System.out.println("Here is your inventory :");
                        if(player.getCard().get("name") == null) {
                            System.out.println("You don't have any card yet.");
                        } else {
                        
                        for(String key: player.getCard().keySet()) {
                            System.out.println(String.format("%s- %s", key, player.getCard().get(key)));
                        }
                    }
                     
                    break;
                    case "/quit": 
                        System.out.println("Thanks for playing this game, see you later !");
                        running = false;
                    break;
                    case "/battle": 
                        if(player.getCard().size() == 0) {
                            System.out.println("You don't have any card, you can't battle ! Run /collect to get a card !");
                        } else {
                            System.out.println("Oh, a monster has spawned, you have to battle him :");
                            Random rand = new Random();
                            Integer health = rand.nextInt(100);
                            int damages = rand.nextInt(25);
                            String name = "Monster" + rand.nextInt(100);
                            Enemy enemy = new Enemy(name, health, damages);
                            System.out.println(String.format("The monster's name is %s. Total Health : %s", enemy.getName(), enemy.getHealth()));
                         
                            boolean turn = rand.nextBoolean();
                            while(player.getCardHealth() > 0 || enemy.getHealth() > 0) {
                                TimeUnit.SECONDS.sleep(2);
                                if(turn) {
                                    player.setCardHealth(player.getCardHealth() - enemy.getDamages());
                                    System.out.println(String.format("You attacked the monster with %s damages, he has now %s health left.", player.getCardDamages(), enemy.getHealth()));
                                    turn = !turn;
                                }else {
                                    enemy.setHealth(enemy.getHealth() - player.getCardDamages());
                                    System.out.println(String.format("The monster attacked you with %s damages, you have now %s health left.", enemy.getDamages(), player.getCardHealth()));
                                    turn = !turn;
                                }
                                
                            }
                            if(player.getCardHealth() <= 0) {
                                System.out.println("You lost the battle !");
                              
                            } else {
                                System.out.println("You won the battle !");
                            }


                        }
                        
                    break;
                    case "/card":
                         if(checkArgs(arr).length() > 0) {System.out.println(checkArgs(arr)); break;}
                        System.out.println("Here is the card you requested for :");
                    break;
                    case "/collect": 
                        System.out.println("A random card has spawned, its :");
                        HashMap<String, String> given_card = new HashMap<String, String>();
                        Random rand = new Random();
                            Integer health = rand.nextInt(100);
                            int damages = rand.nextInt(25);
                            String name = "Card " + rand.nextInt(100);
                        Card card_found = new Card(name, health, damages);
                        given_card.put("name", card_found.getName());
                        given_card.put("health", card_found.getHealth().toString());
                        given_card.put("damages", card_found.getDamages().toString());
                        String past_card;
                        if(player.getCard().get("name") == null) {
                            past_card = "(you don't have any card, gotta fix this =})";
                        } else {
                            past_card = player.getCard().get("name");
                        }
                        System.out.println(String.format("A %s has spawned, its health is %s and its damages are %s.\n==============\nDo you want to erase your past card %s", card_found.getName(), card_found.getHealth(), card_found.getDamages(), past_card));
                        String answer = user_entry.nextLine();
                       
                        if(answer.length() == 3) {
                            
                            player.setCard(given_card);
                      
                            System.out.println("Your card has been replaced !");
                        } else {
                            System.out.println("Your card has not been replaced !");
                        }

                        
                        
                    break;
                    case "/help": 
                        System.out.println("Here is the help page :");
                    break;
                    default: 
                        System.out.println("This Command doesn't exists :");
                }
               
                
      }
        }
      

    }
    private static String checkArgs(String[] arg) {
        if(arg.length == 1) {
            return "There is an argument missing : Ex : /card [card_name]";
           
        }else {
            return "";
        }
       } 
}