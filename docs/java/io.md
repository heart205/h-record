# File 类

构造方法：

```java
File file = new File("/Users/xchen/workSpace/blog/docs/java/io.md"); //相较于当前的路径
File file2 = new File("/Users/xchen/workSpace/blog/docs/", "vue");//  父路径 子路径
File file3 = new File(file2, "vue");//  File文件路径 子路径
```

路径中每级的目录之间都用一个路径分隔符

路径分隔符和系统有关：

windows 和 DOS 系统默认使用"\"来表示

＞ UNIX 和 URL 使用"/"来表示

Java 程序支持跨平台运行，因此路径分隔符要慎用。

为了解决这个隐忠，File 类提供了一个常量：

public static final String separator。根据操作系统，动态的提供分隔符。

```java
new File("Users" + File.separator + "xchen" + File.separator + "workSpace")
```

## 常用的方法

```java
public String getAbsolutePath()：获取绝对路径
public String getPath()：获取路径
public String getName()：获取名称
public String getParent()：获取上层文件目录路径。若无，返回null
public long length()：获取文件长度（即：字节数）。不能获取目录的长度。
public long lastModified()：获取最后一次的修改时间，毫秒值

public String[] list()：获取指定目录下的所有文件或者文件目录的名称数组
public File[] listFiles()：获取指定目录下的所有文件或者文件目录的File数组


public void test() {
     File file2 = new File("/Users/xchen/workSpace/blog/docs/", "vue");
        System.out.println(file2.getAbsoluteFile()); // 获取绝对路径
        System.out.println(file2.getPath()); // 获取路径
        System.out.println(file2.getName()); // 获取名称
        System.out.println(file2.getParent()); // 获取上层文件路径 没有则是null
        System.out.println(file2.length()); // 获取文件的长度(字节数) 不能获取目录的长度
        System.out.println(file2.lastModified()); //最后修改的时间
        String[] fileList = file2.list(); //获取指定目录下的所有文件或者文件目录的数组名称
        if (fileList != null) {
            for (String s : fileList) {
                System.out.println(s);
            }
        }
        File[] fileLists = file2.listFiles(); // 获取指定目录下的所有文件或者文件目录的File数组
        if (fileLists != null) {
            for (File f : fileLists) {
                System.out.println(f);
            }
        }
}
```

## 重命名功能:

```java
public boolean renameTo(FIle dest): 把文件重命名为指定的文件路径
```

## 判断功能

public boolean isDirectory()：判断是否是文件目录

public boolean isFile()：判断是香是文件

public boolean exists()：判断是否存在

public boolean canRead()：判断是否可读

public boolean canWrite()：判断是否可写

public boolean isHidlden()：判断是否隐藏

## 新建文件

public boolean createNewFile()：创建文件。若文件存在，刚不创建，返回 false pubLic boolean mkdir()：创建文件日录。如果此文件日录存在，就不创建了。如果此文件目录上的上一级目录不存在 也不创建

boolean mkdirs(）：创建文件目录。如果上层文件目录不存在，一并创建

删除磁盘中的文件或文件目录

public boolean delete()：删除文件或者文件夹

删除注意事项：

Java 中的册除不走回收站。

> createNewFile:

```java
    public void test1() {
        File file = new File("TestFile.java");
        System.out.println(file.getAbsoluteFile());
        try {
            boolean newFile = file.createNewFile();
            if (newFile) {
                System.out.println("新建成功");
            }
        } catch (IOException e) {
            System.out.println(e);
        }
    }
```

> mkdirs

```java
   public void test2() {
        File file = new File("com/hearts/test/testIo");
        boolean isFile = file.mkdirs(); // 如果上层目录不在的话 一并创建
        if (isFile) {
            System.out.println("创建目录成功");
        }
    }
```

> delete

```java
    public void test3() {
        File file = new File("com/hearts/test/testIo");
        boolean isDelete = file.delete();
        if (isDelete) {
            System.out.println("删除成功");
        }
    }
```
