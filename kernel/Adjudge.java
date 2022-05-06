/**
 * @author Jin
 * @since 2022/5/6
 */
public class Adjudge extends Thread {

    @Override
    public void run() {
        ResultsQueue.RESULTS.poll()
                .forEach(
                        (key, value)
                                -> System.out.println(key + " -------- " + value));

    }
}
