package evaxuexue.dev.movie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestParam("username")String username,@RequestParam("password")String password) {
        User find = new User();
        find.setUsername(username);
        User one = userRepository.findOne(Example.of(find)).orElse(null);
        if (one!=null){
            throw new RuntimeException("User already exists");
        }
        User user = userRepository.insert(new User(username, password));
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestParam("username")String username,@RequestParam("password")String password) {
        User find = new User();
        find.setUsername(username);
        User one = userRepository.findOne(Example.of(find)).orElse(new User());
        if (!Objects.equals(password,one.getPassword())){
            throw new RuntimeException("username or password errorInvalid login or password");
        }
        return new ResponseEntity<>(one, HttpStatus.OK);
    }


}
