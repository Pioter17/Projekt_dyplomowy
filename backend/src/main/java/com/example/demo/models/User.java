package com.example.demo.models;


import com.example.demo.other.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name="_user")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Integer id;
    @Getter
    private String nickname;
    @Getter
    private String name;
    private String password;

  @ElementCollection
  @CollectionTable(name = "user_achievements", joinColumns = @JoinColumn(name = "user_id"))
  @Column(name = "achievement_id")
  private List<Integer> achievements;

    @Enumerated(EnumType.STRING)
    private Role role;

    public User(String name, String passwd) {
        this.name = name;
        this.password = passwd;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
    public void setName(String name) {
        this.name = name;
    }

  public void setPasswd(String passwd) {
        this.password = passwd;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
