import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

/**
 * @author Jin
 * @since 2022/5/6
 */
public class Judge extends Thread {

    @Override
    public void run() {
        appeal();
        balance();
    }

    private void appeal() {
        System.out.println("tell me the truth..");
        Scanner sco = new Scanner(System.in);
        String event = sco.next();
        Receiver.appeal(event);
    }

    private void balance() {
        Map<String, Boolean> result = new HashMap<>();
        String event = ReceiveQueue.EVENTS.poll();

        // balance core algorithm
        Boolean balance = false;

        result.put(event, balance);

        Provider.add(result);
    }
}
