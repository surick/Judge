import java.util.Scanner;

/**
 * @author Jin
 * @since 2022/5/6
 */
public class Appeal extends Thread {

    @Override
    public void run() {

        for (; ; ) {
            System.out.println("tell me the truth.. \n");
            Scanner sco = new Scanner(System.in);
            String event = sco.next();
            Receiver.appeal(event);
        }
    }
}
