import java.util.Objects;

/**
 * @author Jin
 * @since 2022/5/6
 */
public class Adjudge extends Thread {

    @Override
    public void run() {

        for (; ; ) {
            if (ResultsQueue.RESULTS.size() > 0) {
                Objects.requireNonNull(ResultsQueue.RESULTS.poll())
                        .forEach(
                                (key, value) -> {
                                    System.out.println("The God Says: \n");
                                    System.out.println(key + " -> " + value + "\n");
                                });
            }
        }
    }
}
