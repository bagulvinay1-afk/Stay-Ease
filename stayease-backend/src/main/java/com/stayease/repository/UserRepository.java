package com.stayease.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.stayease.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

    List<User> findByRole_Name(String name);
    List<User> findByRole_Id(int roleId);   // to get only owners

    Optional<User> findById(Integer id);
    long countByRole_Name(String roleName);

    long countByRole_NameAndActiveFalse(String roleName);
}
