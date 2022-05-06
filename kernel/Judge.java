import java.util.HashMap;
import java.util.Map;

/**
 * @author Jin
 * @since 2022/5/6
 */
public class Judge extends Thread {

    @Override
    public void run() {

        for (;;) {

            if (ReceiveQueue.EVENTS.size() > 0) {
                try {
                    balance();
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    private void balance() throws InterruptedException {
        Map<String, Boolean> result = new HashMap<>();
        String event = ReceiveQueue.EVENTS.poll();

        // balance core algorithm
        // Thread.sleep(10000);
        Boolean balance = false;

        result.put(event, balance);

        Provider.add(result);
    }
}
