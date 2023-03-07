import {DefineComponent} from "vue";
import {ElMessage} from "element-plus";

interface MyComponent extends DefineComponent {
    // @ts-ignore
    $message: ElMessage;
}
export default MyComponent